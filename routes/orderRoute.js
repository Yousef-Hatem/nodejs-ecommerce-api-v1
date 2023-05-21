const express = require("express");

const { crateCashOrder } = require("../services/orderService");

const router = express.Router();

const authService = require("../services/authService");

router.use(authService.protect, authService.allowedTo("user"));

router.route("/:cartId").post(crateCashOrder);

module.exports = router;
