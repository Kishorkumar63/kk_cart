import axios from "axios";

import {
  productsFail,
  productsRequest,
  productsSuccess,
  
} from "../slices/productSlices";


const getProducts= async (dispatch) => {
  try {
    dispatch(productsRequest());

    const { data } = await axios.get("http://localhost:8000/api/v1/products");
    dispatch(productsSuccess(data));
  } catch (err) {
   //dispatch(productsFail(err))
  }
}

export default getProducts;