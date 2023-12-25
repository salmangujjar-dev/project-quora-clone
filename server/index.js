require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const topicController = require("./controllers/topic");
const questionController = require("./controllers/question");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: '*',
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to Mongoose database successfully'))
  .catch((err) => { });

app.use(bodyParser.json());
app.use("/api/v1/auth", authController);
app.use("/api/v1/user", userController);
app.use("/api/v1/topic", topicController);
app.use("/api/v1/question", questionController);

app.listen(PORT);
