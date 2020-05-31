const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name "],
  },

  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  password: {
    type: String,
    minlength: 8,
    required: [true, "User must have a password "],
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password "],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  blacklisted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
