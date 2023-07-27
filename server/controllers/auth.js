const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const { Users } = require("../models/users");
const {
  checkUsernameExists,
  checkEmailExists,
} = require("../utils/middlewares");

const router = express.Router();
const upload = multer();

router.post(
  "/register",
  upload.single("file"),
  checkUsernameExists,
  checkEmailExists,
  async (req, res) => {
    profile_image = req.file?.buffer || null;
    const { userInfo } = req.body;
    const newUser = new Users({
      ...userInfo,
      profile_image,
    });
    const insertedUser = await newUser.save();
    return res
      .status(201)
      .json({ insertedUser, message: "User created successfully." });
  }
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username }).select("-__v");
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist!", errorCause: "username" });
    }

    const validate = await user.isValidPassword(password);
    if (!validate) {
      return res
        .status(401)
        .json({ message: "Invalid Password!", errorCause: "password" });
    }
    const userInfo = user.toObject();
    delete userInfo.password;

    const token = jwt.sign({ _id: userInfo._id }, "secretKey");

    return res.status(200).json({ userInfo, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
