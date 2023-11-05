import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/ProductSlice";
import authReducer from "./slices/authSlice";

const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
});

const store = configureStore({
  reducer,

  middleware: [thunk],
});

export default store;
