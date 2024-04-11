const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Place order endpoint
router.post(
  "/place",
  authMiddleware.authenticateUser,
  orderController.placeOrder
);

// View orders endpoint
router.get("/", authMiddleware.authenticateUser, orderController.viewOrders);

// Update order endpoint
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  orderController.updateOrder
);

// Delete order endpoint
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  orderController.deleteOrder
);

module.exports = router;
