import { useContext } from 'react';
import TimerContext from '../context/TimerContext';

export default useTimer = () => {
    return useContext(TimerContext);
};