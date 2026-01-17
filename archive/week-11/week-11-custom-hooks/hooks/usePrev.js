import { useEffect, useRef } from "react";

export function usePrev(value) {
    const ref = useRef();
    console.log("re-render happened with new value" + value);

    useEffect(() => {
        console.log("updated the ref to be " + value);
        ref.current = value;
    }, [value]);

    console.log("returned" + ref.current);
    return ref.current;
}

// React returns first, effect gets called later

export function usePrevious(value, initial) {
    const ref = useRef({ target: value, previous: initial });
    if (ref.current.target !== value) {
        ref.current.previous = ref.current.target;
        ref.current.target = value;
    }

    return ref.current.previous;
}