import { useEffect, useState } from 'react';
import PostComponent from './Post';
import ProfileCardComponent from "./ProfileCard";

function App() {
    const [posts, setPosts] = useState([]);
    const [showTimer, setShowTimer] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setShowTimer(prev => !prev);
        }, 5000);
    }, []);

    const postComponents = posts.map(post => (
        <>
            <PostComponent name={post.name} description={post.description} subTitle={post.subTitle} imageUrl={post.imageUrl} time={post.time} key={post.name} /> <br />
        </>
    ));

    function addPost() {
        setPosts([...posts, {
            name: "Shahbaz Ansari",
            description: "Want to learn coding? Join my free bootcamp",
            subTitle: "Full Stack Developer",
            time: "12m",
            imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQFTMSKTJDERcA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728482036160?e=1742428800&v=beta&t=YcJ8Nke7npOW11wRKEelbF9GoUO3oKbGrZisRgxj_Gg"
        }]);
    }

    return (
        <div style={{ backgroundColor: "#bdc3c7", height: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {/* <NotificationComponent /> <br /> */}
                <div>
                    {showTimer && <Timer />}
                </div> <br />
                <CurrentTab /> <br />
                <ToggleMessage /> <br />
                <ToggleMessage /> <br />
                <ToggleMessage /> <br />
                <ProfileCardComponent /> <br />
                <button onClick={addPost}>Add Post</button> <br />
                {postComponents}
            </div>
        </div>
    );
}

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        let clock = setInterval(() => {
            console.log("from inside clock");
            setSeconds(prev => prev + 1);
        }, 1000);

        // cleanup functions

        return function () {
            clearInterval(clock);
        };
    }, []);
    return (
        <div>{seconds} seconds elapsed</div>
    );
};

const ToggleMessage = () => {
    const [notificationCount, setNotificationCount] = useState(0); // [true, function]
    // defining a new state variable
    // when the value of the state variable changes, the component that uses the state variable re-renders.

    // the component will not re-render if we do not use state variable.

    // never update state variable value directly. update it using the function or the 2nd arguement in the state call.
    console.log("re-render");
    function increment() {
        setNotificationCount(notificationCount + 1);
    }
    return (
        <div>
            <button onClick={increment}>
                Increase Count
            </button>
            {notificationCount}
        </div>
    );
};

function NotificationComponent() {
    const [count, setCount] = useState(1);
    function increaseCount() {
        console.log("increase count called " + count);
        setCount(prevCount => prevCount + 1);
    }
    useEffect(() => {
        console.log("above setInterval");
        setInterval(increaseCount, 1000);
    }, []); // this effect will run on mount, because the array is empty

    useEffect(() => {
        console.log("the count has been updated to " + count);
    }, [count]); // this effect will run on mount, and whenever count changes
    return (
        <div>
            <div style={{ display: "flex" }}><div style={{ backgroundColor: "red", borderRadius: "20px", width: "20px", height: "20px", textAlign: "center", marginTop: "5px", position: "absolute", marginLeft: "20px", marginBottom: "15px" }}>{count}</div></div>
            <img src="https://static-00.iconduck.com/assets.00/bell-icon-1755x2048-nqy5lpwy.png" alt='Bell-Icon' width={30} height={35} />
        </div>
    );
}

function CurrentTab() {
    const [currentTab, setCurrentTab] = useState(1);
    const [todoData, setTodoData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab).then(async res => {
            const json = await res.json();
            setTodoData(json);
            setLoading(false);
        });

    }, [currentTab]);
    console.log(todoData);
    return (
        <div>
            <button style={{ color: currentTab === 1 ? "red" : "black" }} onClick={() => {
                setCurrentTab(1);
            }}>Todo #1</button>
            <button style={{ color: currentTab === 2 ? "red" : "black" }} onClick={() => {
                setCurrentTab(2);
            }}>Todo #2</button>
            <button style={{ color: currentTab === 3 ? "red" : "black" }} onClick={() => {
                setCurrentTab(3);
            }}>Todo #3</button>
            <button style={{ color: currentTab === 4 ? "red" : "black" }} onClick={() => {
                setCurrentTab(4);
            }}>Todo #4</button>
            <br />
            {loading ? "Loading..." : todoData.title}
        </div>
    );
}




export default App;
