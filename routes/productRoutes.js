const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Add product endpoint
router.post(
  "/add",
  authMiddleware.authenticateUser,
  productController.addProduct
);

// View products endpoint
router.get("/", productController.viewProducts);

// Edit product endpoint
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  productController.editProduct
);

// Delete product endpoint
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  productController.deleteProduct
);

module.exports = router;
