import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Products",
  initialState: {
    loading: false,
  },
  reducers: {
    productsRequest(state, action) {
      return {
        loading: true,
      };
    },
  },
  productsSuccess(state, action) {
    return {
      loading: false,
      products: action.payload.products,
    };
  },
  productsFail(state, action) {
    return {
      loading: false,
      error: action.payload,
    };
  },
});
const { actions, reducer } = productSlice;
export const { productsRequest, productsSuccess, productsFail } = actions;
export default reducer;
