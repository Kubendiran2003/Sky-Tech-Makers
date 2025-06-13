// /server/routes/questionRoutes.js
const express = require("express");
const {
  submitQuestion,
  getQuestions,
  approveQuestion,
  deleteQuestion,
  getPendingQuestions,
} = require("../controllers/questionController");
const { isAuthenticated } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/role");

const router = express.Router();

router.post("/", isAuthenticated, submitQuestion);
router.get("/", getQuestions);
router.get('/pending', verifyAdmin, getPendingQuestions);
router.put("/:id/approve", isAuthenticated, authorizeRoles("Admin"), approveQuestion);
router.delete("/:id", isAuthenticated, authorizeRoles("Admin"), deleteQuestion);

module.exports = router;