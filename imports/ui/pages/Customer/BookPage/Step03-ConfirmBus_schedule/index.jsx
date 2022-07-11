import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import "./step3.css";

export default ConfirmBus_schedule = () => {
    if (useLocation().state === null) return <Navigate to='/' />
    
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
        total_fare
    } = useLocation().state;

    const handleClick = () => {
        navigate('/bus_schedule/book', {
            state: {
                bus_scheduleId,
                deptStation,
                arrStation,
                deptDate,
                deptTime,
                arrTime,
                travelTime,
                NoPassengers,
                total_fare
            }
        });
    };

    return (
        <React.Fragment>
            <div className ='headpage3'>
                <h2>ยืนยันเลือกรอบรถ</h2>
            </div>

            <div className ='step3'>
                <form className = 'card'>
                    <p>จุดขึ้นรถ : {deptStation}</p>
                    <p>จุดลงรถ : {arrStation}</p>
                    <p>วันเดินทาง : {deptDate}</p>
                    <p>เวลารถออก : {arrTime}</p>
                    <p>เวลาเดินทางโดยประมาณ : {travelTime} ชม.</p>
                    <p>จำนวนผู้เดินทาง : {NoPassengers}</p>
                    <p>จำนวนเงินรวม : {total_fare}</p>
                </form>
                <br/>

                <div className ='buttonpos'>
                    <button id = 'next' className ='button' onClick={() => handleClick()}>
                        ดำเนินการจองต่อไป
                    </button>
                </div>
            </div>      
        </React.Fragment>
    );
};