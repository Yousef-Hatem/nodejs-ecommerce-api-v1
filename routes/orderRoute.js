const express = require("express");

const {
  crateCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
} = require("../services/orderService");

const router = express.Router();

const authService = require("../services/authService");

router.use(authService.protect);

router.post("/:cartId", authService.allowedTo("user"), crateCashOrder);
router.get("/", filterOrderForLoggedUser, findAllOrders);
router.get("/:id", findSpecificOrder);

module.exports = router;
