const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .post(userController.updateUser);

module.exports = router;
