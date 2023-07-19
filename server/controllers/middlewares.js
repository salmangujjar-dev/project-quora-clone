const jwt = require("jsonwebtoken");

const { Users } = require("../models/users");

const checkUsernameExists = async (req, res, next) => {
  try {
    req.body.userInfo = JSON.parse(req.body.userInfo);

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

  const existingUser = await Users.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Email already exists", errorCause: "email" });
  } else {
    next();
  }
};

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

module.exports = { checkUsernameExists, checkEmailExists, verifyToken };
