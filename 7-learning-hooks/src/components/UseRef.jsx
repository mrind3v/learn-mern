import React, { useEffect, useState } from "react";
import { useRef } from "react";

// useRef hook allows us to create mutable variables which will not re-render the component when the variable
// value changes. Also used to access DOM elements

const UseRef = () => {
  const [value, setValue] = useState(0);
  // EG-1 Get render count of a component
  // if we use useState with useEffect to get render count of a component, the render count will go to infinity!
  // because useEffect will run the setCount function every time count changes. And since useEffect will any
  // run once when the component loads, count is changed by setCount, so again the component reloads, which
  // goes on till infinity.

  //   const [cout, setCount] = useState(0);

  //   useEffect(() => {
  //     setCount((prev) => prev + 1);
  //   });

  // The above approach is going to INF. So it doesn't work. But we know that useRef allows use to create
  // variables that do not re-render upon change of value!
  const count = useRef(0); // gives us an object {current: 0} - the 0 is the initial value
  // now we can confidently use it inside useEffect, as count won't re-render the whole component
  useEffect(() => {
    count.current = count.current + 1;
  });

  // EG-2 Accessing DOM element with useRef - will use it to select html input field and do stuff with it!
  const inputEle = useRef();
  function handleClick() {
    console.log(inputEle); // we will get smth like {current: input} in console
    console.log(inputEle.current); // will get <input type="text"/>
    inputEle.current.style.background = "blue";
  }

  return (
    <>
      <button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        +1
      </button>
      <h1>{value}</h1>
      <button
        onClick={() => {
          setValue(value - 1);
        }}
      >
        -1
      </button>
      <h1>Component render count: {count.cuurent}</h1>
      <input type="text" ref={inputEle} />
      <button onClick={handleClick}>Click Here</button>
    </>
  );
};

export default UseRef;
