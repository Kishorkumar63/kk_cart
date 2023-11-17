import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/ProductSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import userReducer from "./slices/userSlice"
const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState:orderReducer,
  userState:userReducer,
});

const store = configureStore({
  reducer,

  middleware: [thunk],
});

export default store;
