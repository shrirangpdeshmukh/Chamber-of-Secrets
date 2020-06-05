const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const postRouter = require("./postRoutes");
const router = express.Router();

router.use("/:userId/myPosts", postRouter);

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/guestSession", authController.guestSession);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.post("/logout", authController.protect, authController.logout);

router.patch(
  "/:id/blacklist",
  authController.protect,
  authController.restrictTo("admin"),
  userController.blacklistUser
);

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
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .post(userController.updateUser);

module.exports = router;
