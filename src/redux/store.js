import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { localStorageMiddleware } from './middleware';

const store = configureStore({
  reducer,
  middleware: [thunk, localStorageMiddleware],
});

export default store;