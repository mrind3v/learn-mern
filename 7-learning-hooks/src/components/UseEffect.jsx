import React, { useState } from "react";
import { useEffect } from "react";

// allows you to perform side effects in your components - fetching data from api, timers, updating DOM, etc
// useEffect takes a callback function and a dependency (its an array and is optional)

// Three ways to use
// 1. without using any dependencies
// 2. using empty array
// 3. using array with variables

// EG-1 A Counter that displays how many times component get loaded
// But without the dependency (which sets the condition for when the callback function inside useEffect
// should run), the count will keep increasing indefinitely. This is because useEffect runs the callback
// fn for the first time when the component UseEffect.jsx loads - and inside the fn, prev count changes
// and we know that with every change of state a compnt reloads, so useEffect runs the callback again
// which results in the count increment one more time and it keeps going on...
// Also, the very first time the component loads, the count immediately changes to 2, this is because of the
// strictmode (in main.jsx) - additional runtime checks in dev mode - can remove it - so then count starts
// from 1 only

// empty dependency array inclusion as the 2nd arg means useEffect runs the callback fn only once - when the
// component loads. If you include the count state in the dependency array, useEffect will run the callback
// when the count state changes - can include multiple variables/states as well

const UseEffect = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 2000);
  }, [count]);
  return <h1>I've rendered {count} times</h1>;
};

export default UseEffect;
