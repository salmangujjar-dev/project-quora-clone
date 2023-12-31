const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questions",
    },
  ],
  image: {
    type: Buffer,
  },
});

const Topics = mongoose.model("topics", topicSchema);

module.exports = { Topics };
