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

export const getUser = createAsyncThunk(
  "getUser",
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_USER_API + _id, {
        headers: {
          token: token,
        },
      });
      return { ...response.data, token };
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ data, token, userInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.put(process.env.REACT_APP_USER_API, data, {
        headers: {
          token,
        },
      });
      const { updatedUser } = response.data;
      const updateUserObj = {
        ...updatedUser,
        _id: userInfo._id,
        profile_image:
          updatedUser.profile_image ?? userInfo.profile_image ?? null,
      };
      toast.info("Profile Updated!");
      return updateUserObj;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleFollowTopic = createAsyncThunk(
  "toggleFollowTopic",
  async ({ topicId, isToggle, userId, token }, { rejectWithValue }) => {
    try {
      const data = {
        topicId,
        isToggle,
      };
      const response = await axios.put(
        process.env.REACT_APP_USER_API + userId + "/toggleFollow",
        data,
        {
          headers: {
            token,
          },
        }
      );
      toast.success(response.data.message);
      return { isToggle, topicId };
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
