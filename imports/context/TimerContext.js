import { Meteor } from 'meteor/meteor';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInterval from '../hooks/useInterval';
import TIMER_status from '../utils/enums/status/TIMER_status';

const TimerContext = createContext({});

export const TimeProvider = ({ children }) => {
    const initialTime = { minutes: 0, seconds: 20 }
    const navigate = useNavigate();

    const [status, setStatus] = useState(TIMER_status.STOP);
    const [time, setTime] = useState({});
    
    const handleStart_timer = (bookingId) => {
        setTime({
            minutes: initialTime.minutes,
            seconds: initialTime.seconds,
            bookingId
        });
        
        setStatus(TIMER_status.START);
    };

    const handleStop_timer = () => setStatus(TIMER_status.STOP);
    
    const handleReset_timer = () => {
        setStatus(TIMER_status.STOP);
        setTime(initialTime);
    };

    const handleTimeout = (bookingId) => {
        handleStop_timer();

        // Meteor.call('booking.cancel', bookingId, (error, result) => {
        //     if (error) {
        //         console.log(error);
        //     } else if (result) {
        //         alert('การจองของท่านถูกยกเลิก เนื่องจากท่านไม่ได้ชำระเงินในเวลาเกินที่กำหนด');
        //         navigate('/');
        //     }
        // });
    };

    useInterval(() => {
        if (time.seconds > 0) {
            setTime(prevState => ({
                ...prevState,
                seconds: time.seconds - 1
            }));
        } else if (time.seconds === 0) {
            if (time.minutes === 0) {
                handleTimeout(time.bookingId);
            } else {
                setTime({
                    minutes: time.minutes - 1,
                    seconds: 59
                })
            }
        }
    }, status === TIMER_status.START ? 1000 : null);

    return (
        <TimerContext.Provider value={{ 
            time, setTime, 
            handleStart_timer, handleStop_timer, handleTimeout 
        }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContext;