const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name "],
  },

  email: {
    type: String,
    required: [true, "User must have an email "],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
