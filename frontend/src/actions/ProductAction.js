import axios from "axios"
import { productFail, productRequest, productSuccess } from "../slices/ProductSlice"
export const getProduct = (id) => async (dispatch) => {


  try {
    dispatch(productRequest())
    const { data } = await axios.get(`/api/v1/product/${id}`)
    
    dispatch(productSuccess(data))

  } catch (error) {
    // Handle Error
    dispatch(productFail(error.data.message))
  }





}