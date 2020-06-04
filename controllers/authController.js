const User = require("./../models/userModel");
const Post = require("./../models/postModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.MY_SECRET);
};

const createToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      name: user.name,
      email: user.email,
    },
  });
};

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

  createToken(user, 200, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createToken(newUser, 201, res);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorized to this", 403));
    }
    next();
  };
};

exports.protect = catchAsync(async (req, res, next) => {
  //1 Get Token and check if there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //console.log(token);

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  //2 Verification token and
  const decoded = await promisify(jwt.verify)(token, process.env.MY_SECRET);
  //console.log(decoded);
  //3 check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("User not found", 401));
  }

  //4 check if user changed password after token was issued

  /*console.log(await freshUser.changedPasswordAfter(decoded.iat));
  if (await freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User changed password after token was issued: Please login again",
        401
      )
    );
  }*/

  req.user = freshUser;
  next();
});

exports.checkCorrectUser = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError("No post with this id", 404));
  }

  //
  const check = req.user.id == post.user;
  console.log(check);
  if (!check) {
    return next(
      new AppError(
        "You can not modify/delete this post, Only the user can modify/delete this post. Admins can blacklist it"
      )
    );
  }
  next();
});

exports.guestSession = catchAsync(async (req, res, next) => {
  const guest = await User.find({ name: "Guest" });
  //console.log(guest);
  const token = signToken(guest._id);

  res.status(200).json({
    status: "success",
    token,
    message:
      "Guest session has been created, you can create posts but not modify/delete , upvote/downvote them.",
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    //user: req.user,
    message: "Logged Out succesfully",
  });
});
