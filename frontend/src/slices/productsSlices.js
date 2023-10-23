import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        product:{}
    },
    reducers: {
        productsRequest(state, action) {
            return {
                loading: true
            }

        },
        productsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload,
            }
        },

    }

})

const { actions, reducer } = productsSlice;
export const { productsSuccess, productsFail, productsRequest } = actions;
export default reducer;