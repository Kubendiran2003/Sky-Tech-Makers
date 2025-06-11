// /server/routes/authRoutes.js
const express = require("express");
const { signup, login, logout, getProfile } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getProfile);

module.exports = router;