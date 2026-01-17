import { useRef, useState } from "react";


const Clock = () => {
    const [currentCount, setCurrentCount] = useState(0);
    const timer = useRef();

    function startClock() {
        let value = setInterval(() => {
            setCurrentCount(count => count + 1);
        }, 1000);

        timer.current = value;
    }

    function stopClock() {
        clearInterval(timer.current);
    }

    return (
        <div>
            {currentCount} <br />
            <button onClick={startClock}>Start</button>
            <button onClick={stopClock}>Stop</button>
        </div>
    );
};

export default Clock;