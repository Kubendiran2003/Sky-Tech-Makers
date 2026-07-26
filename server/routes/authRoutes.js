// /server/routes/authRoutes.js
const express = require("express");
const { signup, login, logout, getProfile, forgotPassword, resetPassword } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getProfile);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;