// step-1 - import redux toolkit
import { configureStore, createSlice } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice.js";
// step-2 - create a store 
export const store = configureStore({
  reducer: {
    // we can have multiple slices of state here
    counter: counterReducer, // counter is the name of the slice, counterReducer is the reducer fn we created
    // in counterSlice.js
  }, 
});
// step-3 - connect this store to our app - go to main.jsx


