const express = require("express");

const authService = require("../services/authService");

const {
  getLoggedUserWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../services/wishlistService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router.route("/").get(getLoggedUserWishlist).post(addProductToWishlist);

router.delete("/:productId", removeProductFromWishlist);

module.exports = router;
