const Post = require("./../models/postModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  const newPost = await Post.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      post: newPost,
    },
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

exports.upvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post with this id", 404));
  }
  const user_id = req.user.id;
  //Check if this user has already upvoted  if (yes) remove the upvote  if (no) down vote
  const checkUserUpvote = post.upvotedBy.indexOf(user_id);
  if (checkUserUpvote === -1) post.upvotedBy.push(user_id);
  else post.upvotedBy.splice(checkUserUpvote, 1);

  // check if the user has alrady downvoted also
  const checkUserDownvote = post.downvotedBy.indexOf(user_id);
  if (checkUserDownvote !== -1) {
    post.downvotedBy.splice(checkUserDownvote, 1);
  }

  await post.save();
  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.downvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const user_id = req.user.id;
  if (!post) {
    return next(new AppError("No post with this id", 404));
  }

  //Check if this user has already downvoted  if (yes) remove the downvote  if (no) down vote
  const checkUserDownvote = post.downvotedBy.indexOf(user_id);
  if (checkUserDownvote === -1) post.downvotedBy.push(user_id);
  else post.downvotedBy.splice(checkUserDownvote, 1);

  // check if the user has alrady upvoted also
  const checkUserUpvote = post.upvotedBy.indexOf(user_id);
  if (checkUserUpvote !== -1) {
    post.upvotedBy.splice(checkUserUpvote, 1);
  }

  await post.save();
  res.status(200).json({
    status: "success",
    data: post,
  });
});
