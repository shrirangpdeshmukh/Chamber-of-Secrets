const User = require("./../models/userModel");
const Post = require("./../models/postModel");
const handler = require("./handler");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createUser = handler.createOne(User);

exports.getUser = handler.getOne(User);

exports.getAllUsers = handler.getAll(User);

exports.deleteUser = handler.deleteOne(User);

exports.updateUser = handler.updateOne(User);

exports.blacklistUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    blacklisted: true,
    blacklistedBy: req.user.id,
  });

  if (!user) {
    return next(new AppError(`No Document find with id ${req.params.id}`, 404));
  }

  const docs = await Post.find({ user: user._id });

  docs.forEach(
    catchAsync(async (doc) => {
      await Post.findByIdAndUpdate(doc._id, {
        blacklisted: true,
        blacklistedBy: req.user.id,
      });
    })
  );

  res.status(200).json({
    status: "success",
    message: "User and All his posts successfully blacklisted",
  });
});
