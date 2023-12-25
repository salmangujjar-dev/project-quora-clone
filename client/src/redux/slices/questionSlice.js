import { createSlice } from "@reduxjs/toolkit";

import {
  askQuestionReducer,
  getQuestionsReducer,
  getUserQuestionsReducer,
  performReactionReducer,
} from "../extraReducers";

const initialState = {
  loading: false,
  open: false,
  questions: [],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.open = !state.open;
    },
  },
  extraReducers: {
    ...askQuestionReducer,
    ...getQuestionsReducer,
    ...performReactionReducer,
    ...getUserQuestionsReducer
  },
});

export const { toggleModal } = questionSlice.actions;

export default questionSlice.reducer;
