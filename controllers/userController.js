const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const handler = require("./handler");

exports.createUser = handler.createOne(User);

exports.getUser = handler.getOne(User);

exports.getAllUsers = handler.getAll(User);

exports.deleteUser = handler.deleteOne(User);

exports.updateUser = handler.updateOne(User);

exports.blacklistUser = handler.blacklistOne(User);
