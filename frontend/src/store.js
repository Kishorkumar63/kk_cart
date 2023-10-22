import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlices";


const reducer = combineReducers({
productsState:productsReducer
});

const store = configureStore({
  reducer,
  middleware: [thunk]
});

export default store;
