const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");

exports.createUser = catchAsync(async (req, res, next) => {
  const newDoc = await User.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      newDoc,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const docs = await User.find();

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      doc: docs,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError(`No User find with id ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: "success",
    message: "post successfully deleted",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError(`No User find with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    message: "user successfully updated",
    user,
  });
});
