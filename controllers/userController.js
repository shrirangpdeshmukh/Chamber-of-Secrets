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

exports.getAllUsers = async (req, res) => {
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
