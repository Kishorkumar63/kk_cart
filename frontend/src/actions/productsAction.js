import axios from "axios"
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlices"
export const getProducts = async (dispatch) => {


  try {
    dispatch(productsRequest())
    const { data } = await axios.get("/api/v1/products")
    
    dispatch(productsSuccess(data))

  } catch (error) {
    // Handle Error
    dispatch(productsFail(error.data.message))
  }





}