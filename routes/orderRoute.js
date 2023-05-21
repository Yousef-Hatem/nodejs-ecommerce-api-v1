const express = require("express");

const {
  crateCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../services/orderService");

const router = express.Router();

const authService = require("../services/authService");

router.use(authService.protect);

router.post("/:cartId", authService.allowedTo("user"), crateCashOrder);

router.get("/", filterOrderForLoggedUser, findAllOrders);
router.get("/:id", findSpecificOrder);

router.use(authService.allowedTo("admin", "manager"));

router.put("/:id/pay", updateOrderToPaid);
router.put("/:id/deliver", updateOrderToDelivered);

module.exports = router;
