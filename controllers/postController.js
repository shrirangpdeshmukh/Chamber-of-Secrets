const Post = require("./../models/postModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createReview = catchAsync(async (req, res, next) => {
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
