import { useEffect, useState } from "react";

// conditional rendering


function App() {
  let [counterVisible, setCounterVisible] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setCounterVisible(c => !c);
    }, 5000);
  }, []);
  return (
    <div>
      Counter App
      {counterVisible && <Counter />}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  // mounting, re-rendering, unmounting
  console.log("counter");
  // hooking into life cycle events of react
  // guard our setInterval from re-renders
  useEffect(() => {
    console.log("on mount");
    let clock = setInterval(() => {
      // setCount(count => count + 1);
      setCount(function (count) {
        return count + 1;
      });
    }, 1000);
    // clearInterval
    return function () {
      console.log("on unmount");
      clearInterval(clock);
    };
    // console.log("Mounted");
  }, []); // dependency array, cleanup, fetch inside useEffect

  function increaseCount() {
    setCount(() => count + 1);
  }

  function decreaseCount() {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(() => count - 1);
    }

  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase Count</button>
      <button onClick={decreaseCount}>Decrease Count</button>
      <button onClick={resetCount}>Reset Count</button>
    </div>

  );
}

export default App;
