const express = require("express");
// const {
//   getReviewValidator,
//   createReviewValidator,
//   updateReviewValidator,
//   deleteReviewValidator,
// } = require("../utils/validators/reviewValidator");

const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../services/reviewService");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(getReviews)
  .post(authService.protect, authService.allowedTo("user"), createReview);
router
  .route("/:id")
  .get(getReview)
  .put(authService.protect, authService.allowedTo("user"), updateReview)
  .delete(
    authService.protect,
    authService.allowedTo("user", "manager", "admin"),
    deleteReview
  );

module.exports = router;
