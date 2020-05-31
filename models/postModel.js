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
    select: false,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
