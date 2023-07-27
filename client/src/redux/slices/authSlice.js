import { createSlice } from "@reduxjs/toolkit";

import {
  registerUserReducer,
  loginUserReducer,
  getUserReducer,
  updateUserReducer,
  toggleFollowTopicReducer,
} from "../extraReducers";

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
  },
  extraReducers: {
    ...registerUserReducer,
    ...loginUserReducer,
    ...getUserReducer,
    ...updateUserReducer,
    ...toggleFollowTopicReducer,
  },
});

export const { logout, updateUserLocal } = authSlice.actions;

export default authSlice.reducer;
