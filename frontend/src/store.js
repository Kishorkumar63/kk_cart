import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productReducer from "./slices/productSlices"

const reducer = combineReducers({
 productState:productReducer
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
