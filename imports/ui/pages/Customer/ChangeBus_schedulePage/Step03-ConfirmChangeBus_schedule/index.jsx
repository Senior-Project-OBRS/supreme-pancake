import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import './step3cb.css'
export default ConfirmChangeBus_schedule = () => {
    if (useLocation().state === null) return <Navigate to='/' />

    const { bookingId } = useParams();
    const navigate = useNavigate();

    const {
        bus_scheduleId,
        deptStation,
        arrStation,
        deptDate,
        deptTime,
        arrTime,
        travelTime,
        NoPassengers,
        total_fare,
        oldDate,
        oldTime,

    } = useLocation().state;

    const { occupied_seat, total_seating } = () => {
        Meteor.call('bus_schedule.getBusSeatingCapacity', bus_scheduleId, (error, result) => {
            if (error) {
                console.error(error);
                alert('เกิดปัญหาในการเรียกความจุที่นั่งรถโดยสาร กรุณาลองใหม่อีกครั้ง');
                return null;
            } else if (result) {
                return {
                    occupied_seat: result.occupied_seat,
                    total_seating: result.total_seating
                };
            }
        });
    };

    const noSeatingAvailable = occupied_seat >= total_seating ? true : false

    if (noSeatingAvailable) {
        alert('รอบนี้เต็มแล้ว กรุณาเลือกรอบอื่น');
        return <Navigate to='/' /> 
    }



    const handleConfirm = e => {
        e.preventDefault();

        Meteor.call('booking.changeDepartureDatetime', bookingId, bus_scheduleId, (err, res) => {
            if (err) {
                console.error(err);
                alert('ไม่สามารถเปลี่ยนวันเดินทางได้ กรุณาลองใหม่อีกครั้ง');
            } else {
                navigate(`/mybooking/${bookingId}`)
            }
        });
    };

    return (
        <React.Fragment>
              <div className ='changeb3'>
                <div className='card'>
                <p>เส้นทาง {deptStation} -&gt; {arrStation}</p>
                <p>เวลาออก {oldTime} | วันที่ {oldDate} <br/>
                จำนวนผู้โดยสาร {NoPassengers} passengers</p>
                </div>

            </div>
            <br/>
            <div className ='changeb3'>
                <div className='card'>
                <p>เส้นทาง {deptStation} -&gt; {arrStation}</p>
                <p>เวลาออก {deptTime} | วันที่ {deptDate} <br/>
                จำนวนผู้โดยสาร {NoPassengers} passengers</p>
                <img position = 'center' src={"../../../new.gif"} className ='imgnew'/>
                </div>
                

            </div>
            <br/>
            <br/>
            <div className ='changeb3'>
            &emsp;<button className ='button' onClick={e => handleConfirm(e)}>
                ยืนยันเปลี่ยนรอบรถ
            </button>
            </div>
        </React.Fragment>
    );
};