const User = require("./../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newDoc = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        doc: newDoc,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
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
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
