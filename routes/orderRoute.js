const express = require("express");

const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require("../services/orderService");

const router = express.Router();

const authService = require("../services/authService");

router.use(authService.protect);

router.get(
  "/checkout-session/:cartId",
  authService.allowedTo("user"),
  checkoutSession
);

router.post("/:cartId", authService.allowedTo("user"), createCashOrder);

router.get("/", filterOrderForLoggedUser, findAllOrders);
router.get("/:id", findSpecificOrder);

router.use(authService.allowedTo("admin", "manager"));

router.put("/:id/pay", updateOrderToPaid);
router.put("/:id/deliver", updateOrderToDelivered);

module.exports = router;
