const jwt = require("jsonwebtoken");

const { Users } = require("../models/users");
const { Topics } = require("../models/topics");

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      jwt.verify(token, "secretKey");
      next();
    } catch (err) {
      res.status(401).json({
        login: false,
      });
    }
  } else {
    res.status(400).json({
      login: false,
      data: "error",
    });
  }
};

const checkUsernameExists = async (req, res, next) => {
  req.body.userInfo = JSON.parse(req.body.userInfo);
  try {
    const { username } = req.body.userInfo;

    const existingUser = await Users.findOne({
      username: { $regex: new RegExp("^" + username + "$", "i") },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
        errorCause: "username",
      });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body.userInfo;

  try {
    const existingUser = await Users.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "Email already exists", errorCause: "email" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const checkTopicExists = async (req, res, next) => {
  const { title } = req.body.topicInfo;

  try {
    const existingTopic = await Topics.findOne({
      title: { $regex: new RegExp("^" + title + "$", "i") },
    });
    if (existingTopic) {
      res
        .status(409)
        .json({ message: "Topic already exists", errorCause: "topic" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  verifyToken,
  checkTopicExists,
  checkUsernameExists,
  checkEmailExists,
};
