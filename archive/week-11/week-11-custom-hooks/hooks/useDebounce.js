
// let currentClock;
// function searchBackend() {
// console.log("reuest sent to backend");
// fetch
// }

import { useRef } from "react";

// function debouncedSearchBackend() {
// start a clock for 30ms.
// if called again, restart the clock for 30ms.
// clearTimeout(currentClock); // stop the old clock
// currentClock = setTimeout(searchBackend, 30); // start a clock
// }

// debouncedSearchBackend();
// debouncedSearchBackend();
// debouncedSearchBackend();
// debouncedSearchBackend();
// debouncedSearchBackend();
// debouncedSearchBackend();
// debouncedSearchBackend();
// debouncedSearchBackend();

// export function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }

export function useDebounce(originalFn) {
    const currentClock = useRef();

    const fn = () => {
        clearTimeout(currentClock.current);
        currentClock.current = setTimeout(originalFn, 200);
    };

    return fn;
}