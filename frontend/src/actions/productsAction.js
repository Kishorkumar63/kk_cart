import axios from "axios";

import {
 
  productsRequest,
  productsSuccess,
  productsFail,
} from "../slices/productSlices";
export const getProducts = async (dispatch) => {
  try {
    dispatch(productsRequest());

    const { data } = await axios.get("http://localhost:8000/api/v1/products");
    dispatch(productsSuccess(data));
  } catch (error) {
    dispatch(productsFail(error.response.data.message));
  }
};
