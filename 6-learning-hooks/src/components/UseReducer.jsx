import React, { useState, useReducer, act } from "react"; // step-1

// useReducer is similar to useState but instead of providing state and setter function, it provides state
// and dispatch function. It accepts two functions -> reducer function and initial state and returns
// current state and dispatch function. The reducer function specifies how the state gets updated

const UseReducer = () => {
  // we will implement the same functionality below (which is using state count and fn setCount) but using
  // the useReducer hook
  // useReducer(reducer, {count: 0}) // first arg -> reducer fn; second arg ->  obj with state and its value
  // OR
  const iniState = { count: 0 }; // step-2
  const reducer = (state, action) => {
    // step-3
    // reducer fn takes current state and action (like inc, dec)
    // return {count: state.count + 1} // from useReducer we get state -> we have an object with count prop
    // that's why its state.count
    switch (action.type) {
      case "increase": {
        return { count: state.count + 1 };
      }
      case "decrease": {
        return { count: state.count - 1 };
      }
      case "input" : {
        return {count: action.payload}
      }
      default: {
        state;
      }
    }
  };
  const [state, dispatch] = useReducer(UseReducer, iniState); // step-4
  //const [count, setCount] = useState(0); //  prev method of incg and decg count

  return (
    <div>
      {" "}
      {/* step-5 */}
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "increase" }); // dispatch will update the count by calling the reducer function
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          dispatch({ type: "decrease" });
        }}
      >
        Decrease
      </button>
      <br />
      {/* I want the above h1 state.count to change when i type in a number in the input field */}
      {/* We can achieve this using the payload */}
      <input
        value={state.count}
        onChange={(e) => {
          dispatch({ type: "input", payload: Number(e.target.value) }); // we can provide a whole payload to dispatch
          // on operate on it. e.target.value is string by default but input tag is of type number
        }}
        type="number"
      />
    </div>
  );
};

export default UseReducer;
