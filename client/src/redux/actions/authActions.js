import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_AUTH_API + "register",
        data
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        process.env.REACT_APP_AUTH_API + "login",
        data,
        config
      );

      toast.success("Logged in successfully");

      localStorage.setItem("_id", response.data.userInfo._id);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
