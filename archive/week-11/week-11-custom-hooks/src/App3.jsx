import { useState } from "react";
import { usePrev } from "../hooks/usePrev";


const App3 = () => {
    const [count, setCount] = useState(0);
    const prev = usePrev(count);
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => {
                setCount(c => c + 1);
            }}>Click me</button>
            <p>The previous value was {prev}</p>
        </div>
    );
};

export default App3;