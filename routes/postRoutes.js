const postController = require("./../controllers/postController");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createReview);

router
  .route("/:id")
  .delete(postController.deletePost)
  .post(postController.updatePost);

module.exports = router;
