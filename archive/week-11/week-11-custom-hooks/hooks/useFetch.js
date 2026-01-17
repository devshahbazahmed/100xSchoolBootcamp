import { useEffect, useState } from "react";

export function useFetch(url, refetchTime) {
    const [finalData, setFinalData] = useState({});
    const [loading, setLoading] = useState(true);

    async function getPosts() {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setFinalData(json);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [url]);

    useEffect(() => {
        let refetchPostInterval = setInterval(getPosts, refetchTime);

        return function () {
            clearInterval(refetchPostInterval);
        };
    }, []);

    return { finalData, loading };
}