const Post = require("./../models/postModel");

exports.createReview = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        post: posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      res.send("No post with this id found");
      next();
    }
    res.status(204).json({
      status: "success",
      message: "post successfully deleted",
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      res.send("No post with this id found");
      next();
    }
    res.status(200).json({
      status: "success",
      message: "post successfully updated",
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
