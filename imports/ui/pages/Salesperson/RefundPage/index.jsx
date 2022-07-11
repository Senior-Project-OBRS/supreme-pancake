// file upload button: https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 

import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import axios from '../../../../api/axios';
import Table, { DefaultColumnFilter, SelectColumnFilter } from '../../../components/Table';
// import FilteringTable, { SelectColumnFilter } from '../../../components/Table/FilteringTable';

import datetime_options from '../../../../utils/datetimeFormat';
import REFUND_status from '../../../../utils/enums/status/REFUND_status';
import REFUND_url from '../../../../utils/enums/url/REFUND_url';
import UPLOAD_url from '../../../../utils/enums/url/UPLOAD_url';

export default RefundPage = () => {
    const [refund_data, setRefund_data] = useState([]);

    // upload file
    const [rowIndex_uploadFile, setRowIndex_uploadFile] = useState(0);
    const [preview_img, setPreview_img] = useState({ name: '', source: '' });
    const [upload_percentage, setUpload_percentage] = useState();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('refund.findAll', (error, result) => {
            if (error) {
                console.error(error);
                alert('something');
            } else if (isSubscribed && result) {
                setRefund_data(makeRefund_data(result));
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    });

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setUpload_percentage(0);
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // }, []);

    const hiddenFileInput = useRef(null);

    const handleClick = (idx) => {
        setRowIndex_uploadFile(idx);
        hiddenFileInput.current.click();
    };

    const handle_previewImage = e => {
        if (e.target.files.length) {
            const file = e.target.files[0];

            setPreview_img({
                name: file.name,
                source: URL.createObjectURL(file)
            });
        }
    }

    const handle_uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", preview_img.source);
        formData.append("fileName", preview_img.name);

        try {
            const res = await axios.post(
                UPLOAD_url.proof_of_refund,
                formData
            );
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    const handle_fileUpload = e => { 
        if (e.target.files.length) {
            const file = e.target.files[0];

            setPreview_img({
                name: file.name,
                source: URL.createObjectURL(file)
            });

            const options = {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.round( (loaded / total) * 100 );
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                    
                    if (percent < 100) setUpload_percentage(percent);
                }
            };

            axios
                .post(UPLOAD_url.proof_of_refund,
                    JSON.stringify({ file }),
                    options
                )
                .then(res => {
                    console.log(res)
                    setUpload_percentage(100);
                })
                .catch(err => {
                    console.error(err);
                    alert('something');
                })
            // const refundId = props.row.original._id;
            // const { bookingNo } = props.row.original;

            // Meteor.call('refund.refunded_successfully', refundId, (error, result) => {
            //     if (error) {
            //         console.error(error);
            //         alert('something');
            //     } else if (result) {
            //         const new_status = result;

            //         refund_data.forEach((item, idx) => {
            //             if (item._id === refundId) {
            //                 refund_data[idx].status = new_status;
            //                 return;
            //             }
            //         });

            //         setPreview_img(URL.createObjectURL(e.target.files[0]));
            //         alert(`คืนเงินหมายเลขการจอง ${bookingNo} เรียบร้อยแล้ว`);
            //     }
            // });
        }
    };

    const sendSMS_notification = bookingNo => {
        Meteor.call('booking.findBookingByBookingNo', bookingNo, (error, result) => {
            if (error) {
                console.error(error);
                alert('something');
            } else if (result) {
                const phoneNo = result.contactInfo[0].phoneNo;

                axios
                    .post(REFUND_url.sendSMS,
                        JSON.stringify({ bookingNo, phoneNo }),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(res => {
                        alert(`คืนเงินหมายเลขการจอง ${bookingNo} เรียบร้อยแล้ว`);
                    })
                    .catch(err => {
                        console.error(err);
                        alert('something');
                    })
            }
        });
    };
    
    const handle_refund = props => {
        const refundId = props.row.original._id;
        const { bookingNo } = props.row.original;

        if (window.confirm(`ยืนยันคืนเงินหมายเลขการจอง ${bookingNo} ใช่หรือไม่`)) {
            Meteor.call('refund.refunded_successfully', refundId, (error, result) => {
                if (error) {
                    console.error(error);
                    alert('something');
                } else if (result) {
                    const new_status = result;

                    refund_data.forEach((item, idx) => {
                        if (item._id === refundId) {
                            refund_data[idx].status = new_status;
                            return;
                        }
                    });

                    sendSMS_notification(bookingNo);
                }
            });
        }
    };

    const makeRefund_data = (info) => {
        return info.map(obj => {
            const booking = obj.booking;
            const recipientAcc = obj.recipientAccount;
            
            return ({
                _id: obj._id,
                bookingNo: booking.bookingNo,
                canceledAt: booking.canceledAt.toLocaleString('en-GB', datetime_options),
                // refundedAt: obj.refundedAt?.toLocaleString('en-GB', datetime_options),
                beneficiaryBankName: recipientAcc?.type.text,
                beneficiaryAccountNo: recipientAcc?.accountNo,
                beneficiaryName: recipientAcc?.accountName,
                amount: obj.amount,
                status: obj.status,
            });
        });
    };

    const refund_columns = React.useMemo(() => [
        {
            Header: 'หมายเลขการจอง',
            accessor: 'bookingNo',
            // filter: 'fuzzyText',
        },
        {
            Header: 'ยกเลิกเมื่อ',
            accessor: 'canceledAt'
        },
        // {
        //     Header: 'คืนเงินเมื่อ',
        //     accessor: 'refundedAt'
        // },
        {
            Header: 'ธนาคารผู้รับเงิน',
            accessor: 'beneficiaryBankName'
        },
        {
            Header: 'เลขที่บัญชีผู้รับเงิน',
            accessor: 'beneficiaryAccountNo'
        },
        {
            Header: 'ชื่อบัญชีผู้รับเงิน',
            accessor: 'beneficiaryName'
        },
        {
            Header: 'จำนวน (บาท)',
            accessor: 'amount'
        },
        {
            Header: 'สถานะ',
            accessor: 'status',
            // Filter: SelectColumnFilter,
            // filter: 'includes',
        },
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => {
                const refund_status = tableProps.row.original.status;

                return (
                    <React.Fragment>
                        {refund_status === REFUND_status.pre_refund ? (
                            <button 
                                onClick={() => handle_refund(tableProps)}
                            >
                                ดำเนินการคืนเงิน
                            </button>
                        ) : null}
                    </React.Fragment>
                );
            }
        }
        // {
        //     Header: 'หลักฐานคืนเงิน',
        //     id: '_id',
        //     accessor: '_id',

        //     Cell: (tableProps) => {
        //         const refund_status = tableProps.row.original.status;
        //         const idx = tableProps.row.index;

        //         return (
        //             <React.Fragment>
        //                 {refund_status === REFUND_status.pre_refund ? (
        //                     <button
        //                         onClick={() => handleClick(idx)}
        //                     >
        //                         อัปโหลดรูปภาพ
        //                     </button>
        //                 ) : (
        //                     <button 
        //                         onClick={() => setOpen(o => !o)}
        //                     >
        //                         แสดงหลักฐานการโอน
        //                     </button>
        //                 )}
        //             </React.Fragment>
        //         );
        //     }
        // }
    ], [refund_data]);

    // const defaultColumn = React.useMemo(() => ({
    //     Filter: DefaultColumnFilter,
    // }), []);

    return (
        <React.Fragment>
            <h2>รายการขอคืนเงิน</h2>

            {/* <input 
                type="file"
                ref={hiddenFileInput}
                name="image"
                id="image"
                accept="image/*"
                // onChange={e => handle_fileUpload(e)}
                onChange={handle_previewImage}
                style={{ display: 'none' }}
            />
            {upload_percentage > 0 && 
                <ProgressBar 
                    now={upload_percentage}   
                    label={ `{${upload_percentage}%}` }
                    active
                />
            }
            <img src={preview_img.source} alt="imagepreview" height="250" width="250" />
            <br />
            <span>{preview_img.name}</span>
            <br />
            <button onClick={handle_uploadFile}>Upload</button> */}

            <Table 
                columns={refund_columns} 
                data={refund_data} 
            />

            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <img src={preview_img} alt="imagepreview" height="250" width="250" />
            </Popup>
        </React.Fragment>
    );
};