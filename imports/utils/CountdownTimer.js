import React, { createContext, useState } from 'react';
import moment from 'moment';
import useInterval from '../hooks/useInterval';
import TIMER_status from './enums/status/TIMER_status';

/* source: https://stackoverflow.com/a/58714213/19060275 */
export default CountdownTimer = () => {
    const [status, setStatus] = useState(TIMER_status.START);

    const now = moment();
    
    const then = moment().add(1, 'minutes');

    const diffTime = then.diff(now);
    const formatted = moment(diffTime).format('mm:ss');

    useInterval(() => {
        console.log(formatted)
    }, status === TIMER_status.START ? 1000 : null)

    return(
        <React.Fragment>
            
        </React.Fragment>
    );
};

// related source
    // https://stackoverflow.com/questions/16129157/countdown-timer-using-moment-js
    // https://stackoverflow.com/questions/42835387/implementing-a-24hour-countdown-timer-using-moment-js
    // https://stackoverflow.com/questions/68397821/react-js-countdown-timer-using-moment-js
    // https://stackoverflow.com/questions/58714032/how-to-keep-a-background-timer-running-in-react-native-even-when-app-is-in-the-b
    // https://stackoverflow.com/questions/40885923/countdown-timer-in-react