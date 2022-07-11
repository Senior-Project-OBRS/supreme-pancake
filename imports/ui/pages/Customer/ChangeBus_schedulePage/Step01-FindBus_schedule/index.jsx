import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/Spinner';
import useNavigateSearch from '../../../../../hooks/useNavigateSearch';
import { isObjectEmpty } from '../../../../../utils/objectUtils';
import './step1cb.css'
export default FindBus_schedule = () => {
    const [booking, setBooking] = useState({});
    const [changeDeptDate, setChangeDeptDate] = useState('');
    const { bookingId } = useParams();

    const navigateSearch = useNavigateSearch();
    
    useEffect(() => {
        let isSubscribed = true;
        Meteor.call('booking.findBookingById', bookingId, (err, res) => {
            if (err) {
                console.error(err);
                alert('เกิดปัญหาในการค้นหา Booking กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed && res) {
                setBooking(res);
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    });
    
    
    
    const handleSubmit = e => {
        e.preventDefault();
    
        navigateSearch(`/changeBus_schedule/${bookingId}/search`, {
            oldDate: booking.bus_schedule.deptDate,
            oldTime: booking.bus_schedule.deptTime,
            deptStation: booking.pickUp_point,
            arrStation: booking.dropOff_point,
            deptDate: changeDeptDate,
            NoPassengers: booking.passengersInfo.length,
        });
    };

    return (
        <React.Fragment>
            {isObjectEmpty(booking) ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <form className ='changebus'>
                        <div className = 'card'>
                            <p>หมายเลขการจอง : {booking.bookingNo}</p>
                            <div>
                        <p>เส้นทาง : {booking.pickUp_point} - {booking.dropOff_point}</p>
                        <p>วันและเวลาเดินทาง : {booking.bus_schedule.deptDate} | {booking.bus_schedule.deptTime}</p>
                            </div>
                            
                    <div>
                        เปลี่ยนวันเดินทาง :
                        <input 
                            type="date"
                            value={changeDeptDate}
                            onChange={e => setChangeDeptDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    <br/>
                            
                    <div className ='changebus'>
                    <button className = 'button' onClick={e => handleSubmit(e)}>
                        ยืนยันเปลี่ยนรอบรถ
                    </button>
                    </div>
                    </div>
                    </form>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};