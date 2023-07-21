import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import topicReducer from "./slices/topicSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicReducer,
  },
});

export { store };
