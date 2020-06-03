const Post = require("./../models/postModel");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const handler = require("./handler");

exports.setUserID = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.createPost = handler.createOne(Post);

exports.getPost = handler.getOne(Post);

exports.getAllPosts = handler.getAll(Post);

exports.deletePost = handler.deleteOne(Post);

exports.updatePost = handler.updateOne(Post);

exports.blacklistPost = handler.blacklistOne(Post);

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

/*exports.blacklistAllPostByUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const docs = await Post.find({ user: user._id });

  docs.forEach(
    catchAsync(async (doc) => {
      await Post.findByIdAndUpdate(doc._id, {
        blacklisted: true,
        blacklistedBy: user._id,
      });
    })
  );

  res.status(200).json({
    status: "success",
    message: "All Posts blacklisted",
    name: user.name,
  });
  next();
});*/
