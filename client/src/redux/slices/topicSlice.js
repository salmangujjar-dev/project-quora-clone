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
  },
  extraReducers: { ...createTopicReducer, ...getTopicsReducer },
});

export const { toggleModal } = topicSlice.actions;

export default topicSlice.reducer;
