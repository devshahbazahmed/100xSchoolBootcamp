import { useDebounce } from "../hooks/useDebounce";


const App4 = () => {
    function sendDataToBackend() {
        fetch("api.amazon.com/search/");
    }

    const debouncedFunction = useDebounce(sendDataToBackend, 500);

    return (
        <div>
            <input type="text" onChange={debouncedFunction} />
        </div>
    );
};

export default App4;