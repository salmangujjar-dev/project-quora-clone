import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  toggleFollowTopic,
} from "./actions/authActions";
import { createTopic, getTopics } from "./actions/topicActions";
import {
  askQuestion,
  getQuestions,
  getUserQuestions,
  performReaction,
} from "./actions/questionActions";

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

const toggleFollowTopicReducer = {
  [toggleFollowTopic.pending]: (state) => {
    state.loading = true;
  },
  [toggleFollowTopic.fulfilled]: (state, { payload }) => {
    const { isToggle, topicId } = payload;
    state.userInfo.following = isToggle
      ? state.userInfo.following.filter((id) => id !== topicId)
      : [...state.userInfo.following, topicId];

    state.loading = false;
  },
  [toggleFollowTopic.rejected]: (state) => {
    state.loading = false;
  },
};

const askQuestionReducer = {
  [askQuestion.pending]: (state) => {
    state.loading = true;
  },
  [askQuestion.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.questions = [...state.questions, payload];
    state.open = !state.open;
  },
  [askQuestion.rejected]: (state) => {
    state.loading = false;
  },
};

const getQuestionsReducer = {
  [getQuestions.pending]: (state) => {
    state.loading = true;
  },
  [getQuestions.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.questions = payload;
  },
  [getQuestions.rejected]: (state) => {
    state.loading = false;
  },
};

const getUserQuestionsReducer = {
  [getUserQuestions.pending]: (state) => {
    state.loading = true;
  },
  [getUserQuestions.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.questions = payload;
  },
  [getUserQuestions.rejected]: (state) => {
    state.loading = false;
  },
};

const performReactionReducer = {
  [performReaction.pending]: (state) => {
    state.loading = true;
  },
  [performReaction.fulfilled]: (state, { payload }) => {
    const updatedState = state.questions.map((question) => {
      if (question._id === payload.questionId) {
        const updatedReactions = { ...question.reactions };

        if (payload.isToggle) {
          delete updatedReactions[Object.keys(payload.reaction)[0]];
        } else {
          Object.assign(updatedReactions, payload.reaction);
        }

        return {
          ...question,
          reactions: updatedReactions,
        };
      }

      return question;
    });
    state.questions = updatedState;
    state.loading = false;
  },
  [performReaction.rejected]: (state) => {
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
  askQuestionReducer,
  getQuestionsReducer,
  performReactionReducer,
  toggleFollowTopicReducer,
  getUserQuestionsReducer
};
