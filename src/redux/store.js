import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { counterReducer } from "./counter";
import { accountsReducer } from "./Slice/AccountSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    accounts: accountsReducer,
    // userDetails: userDetailsReducer, //TODO
    // Add other slice reducers here
  },
});

export default store;

// Create a hook for useDispatch
export const useAppDispatch = () => useDispatch();