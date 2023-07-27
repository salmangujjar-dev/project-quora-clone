import { createSlice } from "@reduxjs/toolkit";

import { createTopicReducer, getTopicsReducer } from "../extraReducers";

const initialState = {
  loading: false,
  open: false,
  topics: [],
  errorCause: null,
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.open = !state.open;
    },
    changeInFollowerCount: (state, { payload }) => {
      const { topicId, isToggle } = payload;
      const actionValue = isToggle ? -1 : 1;

      const question = state.topics.find((item) => item._id === topicId);
      if (question) {
        question.followers += actionValue;
      }
    },
  },
  extraReducers: { ...createTopicReducer, ...getTopicsReducer },
});

export const { toggleModal, changeInFollowerCount } = topicSlice.actions;

export default topicSlice.reducer;
