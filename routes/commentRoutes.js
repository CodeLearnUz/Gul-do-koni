const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

// Add comment endpoint
router.post(
  "/add",
  authMiddleware.authenticateUser,
  commentController.addComment
);

// Delete comment endpoint
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  commentController.deleteComment
);

module.exports = router;
