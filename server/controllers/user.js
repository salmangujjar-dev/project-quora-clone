const express = require("express");
const multer = require("multer");

const { verifyToken } = require("./middlewares");
const { Users } = require("../models/users");

const router = express.Router();
const upload = multer();

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await Users.findOne({ _id }, { password: 0 });

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.put("/:id", upload.single("file"), verifyToken, async (req, res) => {
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
