import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const App2 = () => {
    const [currentPost, setCurrentPost] = useState(1);
    const { finalData, loading } = useFetch(`https://jsonplaceholder.typicode.com/posts/${currentPost}`, 10);

    if (loading) {
        return <div>Loading....</div>;
    }

    return (
        <div>
            <button onClick={() => setCurrentPost(1)}>1</button>
            <button onClick={() => setCurrentPost(2)}>2</button>
            <button onClick={() => setCurrentPost(3)}>3</button>
            {finalData.title}
        </div>
    );
};

export default App2;