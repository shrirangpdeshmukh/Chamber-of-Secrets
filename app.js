const express = require("express");
const morgan = require("morgan");
//dotenv.config({ path: "./config.env" });

//const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes.js");
const postRouter = require("./routes/postRoutes.js");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
module.exports = app;
