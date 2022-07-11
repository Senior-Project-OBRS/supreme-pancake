import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect , useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import Popup from 'reactjs-popup';

import './checkin.css';

export default CheckInbyOfficerPage = () => {
    const [data, setData] = useState([]);
    // const qrRef = useRef(null);
    // const [scanResultFile, setScanResultFile] = useState('');
    
    useEffect(() => {
        let isSubscribed = true;

        if (data.length && isSubscribed) {
            data.forEach(ticketId => {
                Meteor.call('ticket.makeCheck-in', ticketId, (error, result) => {
                    if (error) {
                        console.error(error)
                        alert('เกิดปัญหาในการเช็คอิน กรุณาลองใหม่อีกครั้ง');
                    } 
                });
            });   
        }

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    }, [data]);
    // const handleScanFile = (result) => {
    //     if (result) {
    //         setScanResultFile(result);
    //     }
    // }
    // const onScanFile = () => {
    //   qrRef.current.openImageDialog();
    // }
    // const handleErrorFile = (error) => {
    //     console.log(error);
    //   }

    return (
        <React.Fragment>
            {/* <h2 className='headcheck'>Check-in Page</h2> */}
            <h2 className='headcheck'>หน้าเช็คอินสำหรับพนักงานจำหน่ายตั๋ว</h2>

            <div className='popup-content'>
            <Popup
                trigger={<div className ='popup'><button id = 'qropen' className='button'>สแกน QR code</button></div>}
                modal
            >
                {close => (
                    <div className ='exit'>
                         {/* <button className='button' onClick={close}>
                            &times;
                        </button>  */}
                        {/* <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                         
                        />  */}
                        <QrReader 
                            className='qrread'
                            constraints={{ facingMode: 'environment' }}
                            onResult={(result, error) => {
                                if (Boolean(error)) {
                                    console.info(error);
                                } else if (Boolean(result)) {
                                    const arr = result?.text.split(',').map(item => item.trim());
                                    setData(arr);
                                    // alert('Already Checked !');
                                    alert('เช็คอินสำเร็จ');
                                    close();
                                } 
                            }}
                            style={{ width: '100%' }}
                        />
                       
                    </div>
                )}
            </Popup>
            </div>
        </React.Fragment>
    );
};