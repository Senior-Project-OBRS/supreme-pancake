import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import datetime_options from '../../../../utils/datetimeFormat';
import BOOKING_status from '../../../../utils/enums/status/BOOKING_status';

import "./myBooking.css";

export default MyBookingsPage = () => {
    const [myBookings, setMyBookings] = useState([]);
    const [searchBookingNo, setSearchBookingNo] = useState('');
    const [searchPhoneNo, setSearchPhoneNo] = useState('');

    const navigate = useNavigate();
    const userId = Meteor.userId();

    useEffect(() => {
        let isSubscribed = true;

        if (userId) {
            Meteor.call('booking.findAllBookingsByUserId', userId, (error, result) => {
                if (error) {
                    console.error(error);
                    alert('ไม่สามารถเรียกดู Booking ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (isSubscribed && result) {
                    setMyBookings(result);
                }
            });
        } 

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    });

    const handle_payment = (bookingId) => {
        const booking = myBookings.find(item => item._id === bookingId);

        if (booking) {
            navigate('/bus_schedule/checkout', {
                state: {
                    bus_scheduleId: booking.bus_schedule._id,
                    deptStation: booking.pickUp_point,
                    arrStation: booking.dropOff_point,
                    deptDate: booking.bus_schedule.deptDate,
                    deptTime: booking.bus_schedule.deptTime,
                    arrTime: '',  
                    bookingId: booking._id,
                    bookingNo: booking.bookingNo,
                    bookingStatus: booking.status,
                    contactInfo: booking.contactInfo,
                    passengersInfo: booking.passengersInfo,
                    total_fare: booking.total_fare
                }
            });
        } else {
            alert('Error occured');
        }
    };

    const handle_seeMoreDatails = (bookingId) => {
        navigate(`/mybooking/${bookingId}`);
    };

    const handle_editBooking = (bookingId) => {
        navigate(`/changeBus_schedule/${bookingId}`);
    };

    const handle_checkin = (bookingId) => {
        navigate(`/check-in/${bookingId}`);
    };
    
    const handle_cancelBooking = (booking) => {
        if (window.confirm('ต้องการยกเลิก Booking ใช่หรือไม่ ?')) {
            const bookingId = booking._id;

            if (booking.status === BOOKING_status.post_payment) {
                navigate(`/cancelBooking/${bookingId}`);
            } else {
                Meteor.call('booking.remove', bookingId, (error, result) => {
                    if (error) {
                        console.error(error);
                        alert('ไม่สามารถยกเลิกการจองได้ในขณะนี้');
                    } else if (result) {
                        alert(`ยกเลิกหมายเลขการจอง ${booking.bookingNo} สำเร็จ`);
                    }
                });
            }
        } 
    };
    
    const handle_searchBooking = e => {
        e.preventDefault();

        Meteor.call('booking.accessBookingBy_bookingNo_phoneNo', searchBookingNo, searchPhoneNo, (error, result) => {
            if (error) {
                console.error(error);
                alert('รหัสการจองหรือเบอร์โทรศัพท์ไม่ถูกต้อง');
            } else if (result) {
                navigate(`/mybooking/${result}`);
            }
        });
    };

    return (
        <React.Fragment>
            <form onSubmit={handle_searchBooking}>
                <div className='myBookings'>
                    <div className='card'>
                     
                        <label htmlFor="bookingNo">หมายเลขการจอง</label>
                        <input
                            type="number"
                            id="bookingNo"
                            placeholder='ex. 12345678'
                            onChange={e => setSearchBookingNo(e.target.value)}
                            value={searchBookingNo}
                            required
                        />

                        <label htmlFor='phoneNo'>หมายเลขโทรศัพท์</label>
                        <input 
                            type="number"
                            id="phoneNo"
                            placeholder='ex. 0812345678'
                            onChange={e => setSearchPhoneNo(e.target.value)}
                            value={searchPhoneNo}
                            required
                        />
                        <br/>
                        <button id='findbooking' className='button' type="submit">
                            ค้นหา Booking
                        </button>

                        {/* <Link to="/mybooking/identify">ลืมหมายเลขการจองใช่หรือไม่</Link> */}
                    </div>
                </div>
            </form>

            {myBookings.length != 0 && (
                <div className ='myBooking'>
                   
                    {myBookings.map((myBooking, index) => (
                        <div key={myBooking._id}>
                            
                            <div className='card'>
                            <p>{myBooking.pickUp_point} -&gt; {myBooking.dropOff_point}</p>

                            <p>หมายเลขการจอง : {myBooking.bookingNo}</p>
                            <p>จำนวนผู้โดยสาร : {myBooking.passengersInfo.length}</p>
                        <p>วันที่เดินทาง : {myBooking.bus_schedule.deptDate} เวลาเดินทาง : {myBooking.bus_schedule.deptTime} น. </p>
                           <p>สถานะการจอง : {myBooking.status}</p>
                            
                            <p>จองเมื่อ : {myBooking.createdAt.toLocaleString('en-GB', datetime_options)}</p>

                            <Dropdown>
                                <Dropdown.Toggle id={ 'more' + index } className="btn btn-danger dropdown-toggle" >
                                    เพิ่มเติม
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* {myBooking.status !== 'purchased' &&
                                        <Dropdown.Item onClick={() => handle_payment(myBooking._id)}>
                                            ชำระเงิน    
                                        </Dropdown.Item>
                                    } */}

                                    {(myBooking.status !== BOOKING_status.pre_payment &&
                                    myBooking.status !== BOOKING_status.mid_payment) &&
                                        <Dropdown.Item id={ 'detail' + index } onClick={() => handle_seeMoreDatails(myBooking._id)}>
                                            ดูรายละเอียด
                                        </Dropdown.Item> 
                                    }

                                    {myBooking.status === BOOKING_status.post_payment &&
                                        <React.Fragment>
                                            <Dropdown.Item id={ 'checkin' + index } onClick={() => handle_checkin(myBooking._id)}>
                                                เช็คอิน
                                            </Dropdown.Item>

                                            <Dropdown.Item id={ 'postpone' + index } onClick={() => handle_editBooking(myBooking._id)}>
                                                เลื่อนตั๋ว
                                            </Dropdown.Item>
                                        </React.Fragment>
                                    }

                                    {(myBooking.status !== BOOKING_status.group_checkIn &&
                                    myBooking.status !== BOOKING_status.cancel) &&
                                        <Dropdown.Item id={ 'cancel' + index } onClick={() => handle_cancelBooking(myBooking)}>
                                            ยกเลิกการจอง
                                        </Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <br />
                        </div>            
                    ))}
                </div>             
            )}
        </React.Fragment>
    );
};