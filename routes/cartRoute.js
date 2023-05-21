const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
} = require("../services/cartService");

const router = express.Router();

const authService = require("../services/authService");

router.use(authService.protect, authService.allowedTo("user"));
router
  .route("/")
  .get(getLoggedUserCart)
  .post(addProductToCart)
  .delete(clearCart);

router.route("/:itemId").delete(removeSpecificCartItem);

module.exports = router;
