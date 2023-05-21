const express = require("express");

const { addProductToCart } = require("../services/cartService");

const router = express.Router();

const authService = require("../services/authService");

router.use(authService.protect, authService.allowedTo("user"));

router.route("/").post(addProductToCart);

module.exports = router;
