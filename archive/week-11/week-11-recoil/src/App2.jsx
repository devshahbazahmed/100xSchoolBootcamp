import { useEffect, useState, memo } from "react";
import "./App.css";
import { PropType } from "prop-types";

// React says: Anytime a component re-renders, all its children also re-renders.
// But if you wrap a component inside a memo, only if the props/state in that component has changed, only then it will re-render.

function App2() {
    return (
        <div>
            <Counter />
        </div>
    );
};

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(c => c + 1);
        }, 3000);
    }, []);
    return (
        <div>
            <MemoizedCurrentCount count={count} />
            <IncreaseCount />
            <DecreaseCount />
        </div>
    );
}



const MemoizedCurrentCount = memo(function CurrentCount({ count }) {
    return (
        <div>{count}</div>
    );
});

const IncreaseCount = memo(function Increase() {
    function increase() {

    }
    return (
        <div>
            <button onClick={increase}>Increase</button>
        </div>
    );
});

MemoizedCurrentCount.propTypes = {
    count: PropType.number,
};

const DecreaseCount = memo(function Decrease() {
    function decrease() {

    }
    return (
        <div>
            <button onClick={decrease}>Decrease</button>
        </div>
    );
});

export default App2;