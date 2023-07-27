const express = require("express");

const { verifyToken } = require("../utils/middlewares");
const { Questions } = require("../models/questions");
const { Topics } = require("../models/topics");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const questionInfo = req.body;

    const newQuestion = new Questions(questionInfo);
    const insertedQuestion = await newQuestion.save();

    await Topics.updateMany(
      { _id: { $in: insertedQuestion.relatedTopics } },
      { $push: { questions: insertedQuestion._id } }
    );

    res
      .status(201)
      .json({ insertedQuestion, message: "Question asked successfully." });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:questionId", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const { questionId } = req.params;
    const actionKey = data.isToggle ? "$unset" : "$set";

    await Questions.updateOne(
      {
        _id: questionId,
      },
      {
        [actionKey]: {
          [`reactions.${Object.keys(data.reaction)[0]}`]: Object.values(
            data.reaction
          )[0],
        },
        $inc: {
          likeCount:
            Object.values(data.reaction)[0] === "like"
              ? data.isToggle
                ? -1
                : 1
              : data.prevReaction === "like"
              ? -1
              : 0,
          dislikeCount:
            Object.values(data.reaction)[0] === "dislike"
              ? data.isToggle
                ? -1
                : 1
              : data.prevReaction === "dislike"
              ? -1
              : 0,
        },
      }
    );
    res
      .status(201)
      .json({ reaction: data.reaction, message: "Reaction Success" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
