const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    question: {
      type: String,
      required: true,
    },
    relatedTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
    reactions: {
      type: Object,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const Questions = mongoose.model("questions", questionSchema);

module.exports = { Questions };
