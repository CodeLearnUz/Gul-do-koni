const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin dashboard endpoint
router.get(
  "/dashboard",
  authMiddleware.authenticateUser,
  adminController.dashboard
);

// Other admin endpoints...
// For example: router.get('/products', adminController.getProducts);

module.exports = router;
