import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlices";
export const getProducts =(keyword, price ,category,rating, currentPage) =>async (dispatch) => {
  try {
    dispatch(productsRequest());
    let link=`/api/v1/products?page=${currentPage}`
    if(keyword)
    {
      link+=`&keyword=${keyword}`
    }
    // if(price)
    // {
    //    link+=`&price[gte]=${price[0]}&price[lte]=${price[1]}`
    // }
    if(category)
    {
      link+=`&category=${category}`
    }
    if(rating)
    {
      link+=`&ratings=${rating}`
    }
    const { data } = await axios.get(link);

    dispatch(productsSuccess(data));
  } catch (error) {
    // Handle Error
    dispatch(productsFail(error.data.response.message));
  }
};
