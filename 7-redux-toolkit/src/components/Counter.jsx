import React from "react";
import { useSelector } from "react-redux";
import { dec, inc, incByAmount } from "../state/counter/counterSlice";
import { useDispatch } from "react-redux";

// we are going to connect this compnt to redux to access states and connect it
// so its able to dispatch
const Counter = () => {
  const count = useSelector((state) => {
    return state.counter.value;
    // state is the entire redux state
    // counter is the name of the slice we gave in store.js
    // value is the state inside that slice
  });
  // next - connect this compnt to redux to dispatch actions
  // we need to use useDispatch hook from react-redux because we are using
  // react cannot directly talk to redux. So we use this hook 
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <div>
        <button onClick={()=>{dispatch(inc())}}>Increment</button>
        <button onClick={()=>{dispatch(incByAmount(5))}}>Increment by 5</button>
        <button onClick={()=>{dispatch(dec())}}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
