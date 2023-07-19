import { createSlice } from "@reduxjs/toolkit";
import { registerUserReducer, loginUserReducer } from "../extraReducers";

const initialState = {
  loading: false,
  userInfo: null,
  token: null,
  success: false,
  isLoggedIn: false,
  errorCause: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("_id");
      localStorage.removeItem("token");
      return initialState;
    },
    updateUser: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    ...registerUserReducer,
    ...loginUserReducer,
  },
});

export const { logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
