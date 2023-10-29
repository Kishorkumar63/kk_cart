import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlices";
export const getProducts =(keyword, currentPage) =>async (dispatch) => {
  try {
    dispatch(productsRequest());
    let link=`/api/v1/products?page=${currentPage}`
    if(keyword)
    {
      link+=`&keyword=${keyword}`
    }
    const { data } = await axios.get(link);

    dispatch(productsSuccess(data));
  } catch (error) {
    // Handle Error
    dispatch(productsFail(error.data.message));
  }
};
