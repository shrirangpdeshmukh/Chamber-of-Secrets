const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new AppError("Please provide a valid email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid Email or Password", 401));
  }

  const token = jwt.sign(user.id, process.env.MY_SECRET);

  res.status(200).json({
    status: "success",
    token,
    data: {
      name: user.name,
      email: user.email,
    },
  });
});
