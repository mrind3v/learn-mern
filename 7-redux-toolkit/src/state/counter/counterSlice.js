import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// will store everything related to counter in this slice
const initialState = {
  value: 0,
};

// step-1 - create a slice
// createSlice takes an object as arg
// name of the slice, initial state of the slice, reducers - an object where we define all the reducers related
// to this slice. Each key in the reducers object will be the name of a reducer fn
// Each reducer fn will take state and action as args
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // inc and dec are the reducer fns
    inc: (state) => {
      state.value += 1; // we can directly mutate the state like this because under the hood immer library
      // is used which makes sure that the state is not mutated directly
    },
    dec: (state) => {
      state.value -= 1;
    },
    // say i want to pass some value to which i want to inc or dec the count by
    // so we will use action here
    incByAmount: (state, action)    => {
      state.value += action.payload; // whatever value we pass while dispatching the action will be available
      // in action.payload
    },
  },
});

// async actions
export const incAsync = createAsyncThunk(
  "counter/incAsync", // name of the action
    // we will just use a setTimeout to simulate an async action here
    async (amount) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
);

// step-2 - export the actions and the reducer
export const { inc, dec, incByAmount } = counterSlice.actions; // we will use these actions in our components

export default counterSlice.reducer; // we will provide this reducer to our store
// go to store.js now