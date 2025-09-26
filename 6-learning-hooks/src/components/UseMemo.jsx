import React from "react";
import { useMemo, useEffect, useState } from "react";

// useMemo is used to cache values so it doesn't get recalculated everytime. Used to improve performance of
// our app. It only runs when one of its dependencies get updated. One more hook to improve performance -
// useCallback. Difference is useMemo returns a memoized value and useCallback returns a memoized function

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  function cubeNum(num) {
    console.log("Calculation done!"); // this should only run when the whole component renders
    return Math.pow(num, 3);
  }

  // const result = cubeNum(number)
  // memoizing this result
  const result = useMemo(() => {
    return cubeNum(number);
  }, [number]); // useMemo will only execute the callback fn inside it only when "number" in dep array changes
  return (
    <div>
      {/* whenever the user types in input field -> value = typed thing -> e.target.value is the value */}
      <input
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <h1>Cube of the number: {result}</h1>
      {/* whenever we increase this count using the counter++ button, we get "Calculation done!" message */}
      {/* Even when we are not updating number state, it's showing calculation done. this is because incg */}
      {/* the counter re-renders the whole component as the count state changes, so the calculation of cube */}
      {/* is also being done again with the existing number state as the compnt re-renders */}
      {/* To prevent the function from re-calculating on every compnt re-render, we can memoize */}
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Counter++
      </button>
      <h1>Counter value: {count}</h1>
    </div>
  );
};

export default UseMemo;
