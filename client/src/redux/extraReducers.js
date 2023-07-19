import { registerUser, loginUser } from "./actions/authActions";

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

export { registerUserReducer, loginUserReducer };
