const express = require("express");
const multer = require("multer");

const { verifyToken, checkTopicExists } = require("../utils/middlewares");
const { Topics } = require("../models/topics");

const upload = multer();
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const topics = await Topics.find({}).select("-__v").sort({ followers: -1 });
    const data = topics.map((topic) => topic.toObject());

    res.status(200).json({ topics: data, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:topicId/question-count", verifyToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    const { questions } = await Topics.findOne({ _id: topicId })
      .select("questions -_id")
      .populate("questions");

    res.status(200).json({ length: questions.length, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:topicId/:pageNumber", verifyToken, async (req, res) => {
  try {
    const { topicId, pageNumber } = req.params;

    const skip = (pageNumber - 1) * process.env.QUESTIONS_PER_PAGE;

    const { questions } = await Topics.findOne({ _id: topicId })
      .select("questions -_id")
      .populate({
        path: "questions",
        skip: skip,
        perDocumentLimit: process.env.QUESTIONS_PER_PAGE,
        populate: {
          path: "author",
          select: "name",
        },
        options: {
          sort: { likeCount: -1, dislikeCount: -1 },
        },
      });
    console.log(questions);
    res.status(200).json({ questions, message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/",
  upload.single("file"),
  verifyToken,
  checkTopicExists,
  async (req, res) => {
    try {
      image = req.file?.buffer || null;

      const topicInfo = JSON.parse(req.body.topicInfo);
      const newTopic = new Topics({
        ...topicInfo,
        followers: 0,
        image,
      });
      let insertedTopic = await newTopic.save();
      insertedTopic = insertedTopic.toObject();
      insertedTopic.image = image && insertedTopic.image.toString("base64");

      res
        .status(201)
        .json({ insertedTopic, message: "Topic created successfully." });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
