const express = require("express");
const multer = require("multer");

const { verifyToken } = require("../utils/middlewares");
const { Users } = require("../models/users");
const { Topics } = require("../models/topics");
const { Questions } = require("../models/questions");

const router = express.Router();
const upload = multer();

router.get("/:_id", verifyToken, async (req, res) => {
  try {
    const { _id } = req.params;

    const user = await Users.findOne({ _id }).select("-__v");
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist!", errorCause: "username" });
    }
    const userInfo = user.toObject();
    delete userInfo.password;

    return res.status(200).json({ userInfo });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/:_id/:pageNumber", verifyToken, async (req, res) => {
  try {
    const { _id, pageNumber } = req.params;

    const skip = (pageNumber - 1) * process.env.QUESTIONS_PER_PAGE;

    const { following } = await Users.findOne({ _id }).select("following -_id");

    const questions = await Questions.find({
      relatedTopics: { $in: following },
    })
      .sort({ likeCount: -1, dislikeCount: -1 })
      .skip(skip)
      .limit(process.env.QUESTIONS_PER_PAGE)
      .populate("author", "name");

    res.status(200).json({ questions, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get(
  "/:_id/followed-topics/question-count",
  verifyToken,
  async (req, res) => {
    try {
      const { _id } = req.params;

      const { following } = await Users.findOne({ _id }).select(
        "following -_id"
      );

      const questionCount = await Questions.count({
        relatedTopics: { $in: following },
      });

      res.status(200).json({ questionCount, message: "Success" });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.put("/", upload.single("file"), verifyToken, async (req, res) => {
  profile_image = req.file?.buffer || null;

  const updatedUser = {
    ...JSON.parse(req.body.updatedUserInfo),
    ...(profile_image && { profile_image }),
  };
  try {
    await Users.updateOne(
      {
        username: updatedUser.username,
      },
      {
        $set: {
          ...updatedUser,
        },
      }
    );

    updatedUser.profile_image =
      profile_image && profile_image.toString("base64");
    res.status(201).json({ updatedUser });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.put("/:_id/toggleFollow", verifyToken, async (req, res) => {
  try {
    const { _id } = req.params;
    const { topicId, isToggle } = req.body;

    const actionKey = isToggle ? "$pull" : "$push";
    const actionKeyValue = isToggle ? -1 : 1;

    await Users.updateOne(
      {
        _id,
      },
      {
        [actionKey]: {
          following: topicId,
        },
      }
    );

    await Topics.updateOne(
      { _id: topicId },
      { $inc: { followers: actionKeyValue } }
    );

    res
      .status(201)
      .json({ message: isToggle ? "Topic Unfollowed" : "Topic Followed" });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;
