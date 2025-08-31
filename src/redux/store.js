import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { counterReducer } from "./counter";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // userDetails: userDetailsReducer, //TODO
    // Add other slice reducers here
  },
});

export default store;

// Create a hook for useDispatch
export const useAppDispatch = () => useDispatch();