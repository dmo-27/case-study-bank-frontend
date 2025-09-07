import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { counterReducer } from "./counter";
import { accountsReducer } from "./Slice/AccountSlice";
import { userReducer } from "./Slice/User";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["user"], // persist only 'user' slice, or
  // blacklist: ["temp"], // or blacklist slices (DO NOT persist session/secrets directly)
};

const rootReducer = combineReducers({
  counter: counterReducer,
  accounts: accountsReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);

// Create a hook for useDispatch
export const useAppDispatch = () => useDispatch();