const express = require("express");
const morgan = require("morgan");
//dotenv.config({ path: "./config.env" });

//const mongoose = require("mongoose");
const AppError = require("./utils/appError.js");
const errorHandler = require("./controllers/errorController1");
const userRouter = require("./routes/userRoutes.js");
const postRouter = require("./routes/postRoutes.js");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`No url found found for ${req.url}`, 404));
});

app.use(errorHandler);
module.exports = app;
