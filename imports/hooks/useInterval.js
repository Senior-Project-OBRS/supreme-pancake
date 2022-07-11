import { useEffect, useRef } from 'react';

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // set up the interval
    useEffect(() => {
        const tick = () => savedCallback.current();
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};