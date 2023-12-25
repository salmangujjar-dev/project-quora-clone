import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const askQuestion = createAsyncThunk(
  "askQuestion",
  async ({ data, name, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_QUESTION_API,
        data,
        {
          headers: { "Content-Type": "application/json", token },
        }
      );
      toast.success(response.data.message);
      let { insertedQuestion } = response.data;
      insertedQuestion.author = { _id: insertedQuestion.author, name };
      return insertedQuestion;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuestions = createAsyncThunk(
  "getQuestions",
  async ({ _id, token, currentPage }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_USER_API + _id + "/" + currentPage,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data.questions;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserQuestions = createAsyncThunk(
  "getUserQuestions",
  async ({ _id, token, currentPage }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_USER_API + _id + "/",
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data.questions;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const performReaction = createAsyncThunk(
  "performReaction",
  async (
    { questionId, userId, updatedReaction, prevReaction, token, isToggle },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        reaction: {
          [userId]: updatedReaction,
        },
        prevReaction,
        isToggle,
      };
      const response = await axios.put(
        process.env.REACT_APP_QUESTION_API + questionId,
        data,
        {
          "Content-Type": "application/json",
          headers: { token },
        }
      );

      const modifiedReturn = {
        reaction: response.data.reaction,
        questionId,
        userId,
        isToggle,
      };
      return modifiedReturn;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
