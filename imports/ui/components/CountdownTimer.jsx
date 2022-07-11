import React from 'react';
import useTimer from '../../hooks/useTimer';

export default CountdownTimer = () => {
    const { time } = useTimer();

    let minutes = time.minutes;
    let seconds = time.seconds;

    /* https://stackoverflow.com/a/2998874/1673761 */
    const twoDigits = (num) => String(num).padStart(2, '0');

    return (
        <React.Fragment>
            <div>
                {minutes === 0 && seconds === 0
                    ? null
                    : <h1> 
                        <span>{twoDigits(minutes)}</span>:
                        <span>{twoDigits(seconds)}</span>  
                    </h1>
                }
            </div>
        </React.Fragment>
    );
};