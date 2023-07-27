import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createTopic = createAsyncThunk(
  "createTopic",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(process.env.REACT_APP_TOPIC_API, data, {
        headers: {
          token: token,
        },
      });
      toast.success(response.data.message);
      return response.data.insertedTopic;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopics = createAsyncThunk(
  "getTopics",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_TOPIC_API, {
        headers: {
          token: token,
        },
      });
      return response.data.topics;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopicDetails = createAsyncThunk(
  "getTopicInfo",
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_TOPIC_API + _id, {
        headers: {
          token: token,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
