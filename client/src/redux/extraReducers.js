import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} from "./actions/authActions";
import { createTopic, getTopics } from "./actions/topicActions";

const registerUserReducer = {
  [registerUser.pending]: (state) => {
    state.loading = true;
  },
  [registerUser.fulfilled]: (state) => {
    state.loading = false;
    state.success = true;
  },
  [registerUser.rejected]: (state, { payload }) => {
    state.loading = false;
    state.errorCause = payload.errorCause;
  },
};

const loginUserReducer = {
  [loginUser.pending]: (state) => {
    state.loading = true;
  },
  [loginUser.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.userInfo = payload.userInfo;
    state.token = payload.token;
    state.isLoggedIn = true;
  },
  [loginUser.rejected]: (state, { payload }) => {
    state.loading = false;
    state.errorCause = payload.errorCause;
  },
};

const getUserReducer = {
  [getUser.pending]: (state) => {
    state.loading = true;
  },
  [getUser.fulfilled]: (state, { payload }) => {
    state.userInfo = payload.userInfo;
    state.token = payload.token;
    state.isLoggedIn = true;
    state.loading = false;
  },
  [getUser.rejected]: (state, { payload }) => {
    state.loading = false;
  },
};

const updateUserReducer = {
  [updateUser.pending]: (state) => {
    state.loading = true;
  },
  [updateUser.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.userInfo = payload;
  },
  [updateUser.rejected]: (state) => {
    state.loading = false;
  },
};

const createTopicReducer = {
  [createTopic.pending]: (state) => {
    state.loading = true;
  },
  [createTopic.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.topics = [...state.topics, payload];
    state.open = !state.open;
  },
  [createTopic.rejected]: (state, { payload }) => {
    state.loading = false;
    state.errorCause = payload.errorCause;
  },
};

const getTopicsReducer = {
  [getTopics.pending]: (state) => {
    state.loading = true;
  },
  [getTopics.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.topics = payload;
  },
  [getTopics.rejected]: (state) => {
    state.loading = false;
  },
};

export {
  registerUserReducer,
  loginUserReducer,
  getUserReducer,
  updateUserReducer,
  createTopicReducer,
  getTopicsReducer,
};
