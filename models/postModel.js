const mongoose = require("mongoose");
const User = require("./userModel");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Post can not be empty"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user"],
  },

  blacklisted: {
    type: Boolean,
    default: false,
  },

  blacklistedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  upvotedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],

  downvotedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
