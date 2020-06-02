const Post = require("./../models/postModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      post: posts,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError("No post with this id", 404));
  }
  res.status(204).json({
    status: "success",
    message: "post successfully deleted",
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return next(new AppError("No post with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "post successfully updated",
    post,
  });
});

exports.blacklistPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    blacklisted: true,
    blacklistedBy: req.user.id,
  });

  if (!post) {
    return next(new AppError("No post with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Blacklisted successfully",
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.upvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post with this id", 404));
  }
  post.upvotedBy.push(req.user.id);
  await post.save();
  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.downvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post with this id", 404));
  }
  post.downvotedBy.push(req.user.id);
  await post.save();
  res.status(200).json({
    status: "success",
    data: post,
  });
});
