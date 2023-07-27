const express = require("express");
const multer = require("multer");

const { verifyToken } = require("../utils/middlewares");
const { Users } = require("../models/users");

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

module.exports = router;
