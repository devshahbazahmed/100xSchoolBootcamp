import { useRef } from "react";


// useRef
// reference to a value, such that when u change the value, the component DOES NOT RE-RENDER

const App2 = () => {
    const inputRef = useRef();

    // let value = 1  // rarely we use raw variable in React
    // const [value, setValue] = useState(0); // use when you want the component to re-render
    // const valueRef = useRef(); // use when you do not want the component to re-render
    function focusOnInput() {
        inputRef.current.focus();
    }
    return (
        <div>
            Signup
            <input id="name" type="text" ref={inputRef} />
            <input id="password" type="text" />
            <button onClick={focusOnInput}>Submit</button>
        </div>
    );
};

export default App2;