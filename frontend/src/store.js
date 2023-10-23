import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/ProductSlice"


const reducer = combineReducers({
productsState:productsReducer,
productState:productReducer 
});

const store = configureStore({
  reducer,

  middleware: [thunk]

});

export default store;
