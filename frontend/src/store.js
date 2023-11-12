import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/ProductSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState:orderReducer,
});

const store = configureStore({
  reducer,

  middleware: [thunk],
});

export default store;
