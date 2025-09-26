import React, { useCallback, useState } from "react";
import Header from "./Header";

// lets us cache a function definition between re-renders. When we use - useCallback, it doesn't create multiple
// instance of same function when re-render happens

const UseCallback = () => {
  const [count, setCount] = useState(0);
//   function newFn() {
//     // pass this fn as prop to Header
//   }
// cahching this newFn using useCallback so that it doesn't create a new instance everytime if fn body remains
// the same
const newFn = useCallback(()=>{},[count]) // whenever count changes, a new instance of newFn will be created
// so header will indeed re-render. so keep it empty if you do not want to use the same cached newFn 
  return (
    <>
    {/* Header will render everytime click here is clicked, even tho we are not changing anything in Header comp*/}
    {/* Because UseCallback cmp renders everytime count state changes and since Header compnt is mounted in */}
    {/* UseCallback compnt, Header also re-renders! */}
    {/* Next we pass a fn called newFn as prop to Header -> this will again result in Header compnt re-rendering */}
    {/* and "Header rendered in console" logs whenever we update the counter */}
    {/* This is due to referential equality -> whenver we change counter in this compnt, the count state changes */}
    {/* And the whole compnt is re-rendered -> as a result a newFn instance is being formed everytime and every */}
    {/* new instance of newFn is not the same! -> so prop changes -> hence Header compnt also re-renders! */}
    {/* To solve this -> newFn = useCallback(fn,dependency) */}
    <Header newFn={newFn}/>
      <h1>{count}</h1>
      <button
        onChange={() => {
          setCount(count + 1);
        }}
      >
        Click Here
      </button>
    </>
  );
};

export default UseCallback;
