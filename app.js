const express = require("express");

//dotenv.config({ path: "./config.env" });

//const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes.js");
const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
module.exports = app;
