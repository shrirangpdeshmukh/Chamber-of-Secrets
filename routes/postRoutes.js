const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");

const express = require("express");

const router = express.Router({ mergeParams: true });

router.get(
  "/myposts",
  authController.protect,
  postController.getAllPostsbyUser
);

router.patch(
  "/:id/blacklist",
  authController.protect,
  authController.restrictTo("admin"),
  postController.blacklistPost
);

router.post(
  "/:id/upvote",
  authController.protect,
  authController.restrictTo("admin", "user"),
  postController.upvotePost
);
router.post(
  "/:id/downvote",
  authController.protect,
  authController.restrictTo("admin", "user"),
  postController.downvotePost
);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    postController.setUserID,
    postController.createPost
  );

router
  .route("/:id")
  .get(postController.getPost)
  .delete(
    authController.protect,
    authController.checkCorrectUser,
    postController.deletePost
  )
  .post(
    authController.protect,
    authController.checkCorrectUser,
    postController.updatePost
  );

module.exports = router;
