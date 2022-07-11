import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import "./myBooking.css";

import Spinner from '../../../components/Spinner';
import { isObjectEmpty } from '../../../../utils/objectUtils';
import BOOKING_status from '../../../../utils/enums/status/BOOKING_status';

export default BookingDetails = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [booking, setBooking] = useState({});
    const [showTicket, setShowTicket] = useState(false);

    const { bookingId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('booking.findBookingById', bookingId, (error, result) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเรียกดู Booking ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else if (result && isSubscribed) {
                setBooking(result);

            }
        });

        Meteor.call('ticket.findAllTicketsByBookingId', bookingId, (err, res) => {
            if (err) {
                console.error(err)
                alert('เกิดปัญหาในการค้นหาตั๋วโดยสาร กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed && res) {
                setAllTickets(res);        
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    });

    const handle_showTicket = () => {
        setShowTicket(true);
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
                        alert('something');
                    } else if (result) {
                        alert(`ยกเลิกหมายเลขการจอง ${booking.bookingNo} สำเร็จ`);
                        navigate('/mybookings'); 
                    }
                });
            }
        } 
    };

    return (
        <React.Fragment>
            {isObjectEmpty(booking) ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <div class='myBookingg'>  
                        <div class='card'>
                        
                         
                            <p>
                            {/* สถานะการจอง : {booking.status}<br /> */}
                                
                                หมายเลขการจอง : {booking.bookingNo}<br />
                                เส้นทาง : {booking.pickUp_point} - {booking.dropOff_point}<br />
                                จำนวนผู้โดยสาร : {booking.passengersInfo.length}<br />
                                วันที่เดินทาง : {booking.bus_schedule.deptDate} เวลาเดินทาง : {booking.bus_schedule.deptTime} น. 
                               
                               
                       
                            </p>

                            <Dropdown>
                                <Dropdown.Toggle 
                                    id = 'opendrop'
                                    className="btn btn-danger dropdown-toggle"
                                >
                                    เพิ่มเติม
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                    {(booking.status !== BOOKING_status.pre_payment &&
                                    booking.status !== BOOKING_status.mid_payment) &&
                                        <Dropdown.Item 
                                            id='ticketprint'
                                            className ="btn btn-danger dropdown-toggle" 
                                            onClick={() => handle_showTicket()}
                                        >
                                            แสดง E-ticket
                                        </Dropdown.Item>
                                    }

                                    {booking.status === BOOKING_status.post_payment &&
                                        <React.Fragment>
                                            <Dropdown.Item 
                                                id='changedate'
                                                className ="btn btn-danger dropdown-toggle" 
                                                onClick={() => handle_checkin(booking._id)}
                                            >
                                                เช็คอิน
                                            </Dropdown.Item>

                                            <Dropdown.Item 
                                                id='cancelbooking'
                                                className ="btn btn-danger dropdown-toggle" 
                                                onClick={() => handle_editBooking(booking._id)}
                                            >
                                                เลื่อนตั๋ว
                                            </Dropdown.Item>
                                        </React.Fragment> 
                                    }

                                    {(booking.status !== BOOKING_status.group_checkIn &&
                                    booking.status !== BOOKING_status.cancel) &&
                                        <Dropdown.Item 
                                            className ="btn btn-danger dropdown-toggle" 
                                            onClick={() => handle_cancelBooking(booking)}
                                        >
                                            ยกเลิกการจอง
                                        </Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    {showTicket && (booking.status !== BOOKING_status.pre_payment && 
                    booking.status !== BOOKING_status.mid_payment) &&
                        <main rel="preload" class="ticket-system">
                            <div rel="preload" class="top">
                                <div rel="preload" class="printer" />
                            </div>

                            {allTickets.map(ticket => (
                                <div rel="preload" class="receipts-wrapper" key={ticket._id}>
                                    <div rel="preload" class="receipts">
                                        <div rel="preload" class="receipt">
                                        <div rel="preload" class="route">
                                       
                    <h2>{ticket.booking.bus_schedule.route.srcStation.province}</h2>
                    <svg class ='plane-icon' version="1.0" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path d="M70 493 c-36 -13 -40 -33 -39 -222 0 -102 3 -204 7 -226 7 -39 9 -40 50 -43 37 -3 44 0 49 17 5 20 13 21 113 21 100 0 108 -1 113 -21 5 -17 12 -20 49 -17 41 3 43 4 50 43 4 22 7 124 7 228 1 245 18 227 -211 226 -95 0 -180 -3 -188 -6z m300 -53 c0 -19 -7 -20 -115 -20 -108 0 -115 1 -115 20 0 19 7 20 115 20 108 0 115 -1 115 -20z m48 -131 c2 -56 -1 -79 -11 -88 -10 -8 -61 -11 -168 -9 l-154 3 -3 74 c-2 41 -1 80 2 88 5 11 38 13 168 11 l163 -3 3 -76z m-274 -171 c8 -14 7 -21 -6 -34 -30 -30 -75 9 -48 42 16 18 39 15 54 -8z m270 0 c8 -14 7 -21 -6 -34 -30 -30 -75 9 -48 42 16 18 39 15 54 -8z"/>
        <path d="M7 373 c-11 -10 -8 -101 3 -108 6 -4 10 17 10 54 0 62 -1 66 -13 54z"/>
        <path d="M480 320 c0 -38 4 -59 10 -55 6 3 10 28 10 55 0 27 -4 52 -10 55 -6 4 -10 -17 -10 -55z"/>
        </g>
        </svg>
                    
                    <h2> {ticket.booking.bus_schedule.route.dstnStation.province}</h2>
                    </div>

                                    <div class="details">
                                    
                                    <div class="item">
                                    <span>ผู้โดยสาร</span>
                                    <h3>{ticket.firstName}  {ticket.lastName}</h3>
                                        </div>
                                    <div class="item">
                                    <span>ทะเบียนรถโดยสาร</span>
                                    <h3>{ticket.booking.bus_schedule.bus.plate_number}</h3>
                                    </div>
                                    <div class="item">
                                        <span>จุดขึ้น</span>
                                            <h3> {ticket.booking.pickUp_point}</h3>
                                        </div>
                                        <div class="item">
                                            <span>จุดลง</span>
                                        <h3>{ticket.booking.dropOff_point}</h3>
                                        </div>
                                        <div class="item">
                                        <span>วันที่เดินทาง</span>
                                        <h3>{ticket.booking.bus_schedule.deptDate}</h3>
                                    </div>
                                    <div class="item">
                                        <span>เวลาเดินทาง</span>
                                        <h3>{ticket.booking.bus_schedule.deptTime}</h3>
                                        </div>
                                        <div class="item">
                                        <span>สถานะ</span>
                                        <h3>{ticket.status}</h3>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>         
                            ))} 
                        </main>
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    );
};