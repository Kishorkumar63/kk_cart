import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAutheticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAutheticated: true,
        user: action.payload.user,
      };
    },
    productFail(state, action) {
      return {
        ...state,
        loading: false,

        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error:null,
      };
    },
  },
});

const { actions, reducer } = authSlice;
export const { loginSuccess, loginFail, loginRequest,clearError } = actions;
export default reducer;
