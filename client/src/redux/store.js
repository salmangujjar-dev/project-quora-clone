import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import topicReducer from "./slices/topicSlice";
import questionReducer from "./slices/questionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicReducer,
    questions: questionReducer,
  },
});

export { store };
