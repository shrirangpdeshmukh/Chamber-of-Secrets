const User = require("./../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const newDoc = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newDoc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const docs = await User.find();

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        doc: docs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.send("No user with this id found");
      next();
    }
    res.status(204).json({
      status: "success",
      message: "post successfully deleted",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.send("No user with this id found");
      next();
    }
    res.status(200).json({
      status: "success",
      message: "user successfully updated",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
