const express = require("express");
const {
  getChallenge,
  getChallengeStatus,
  runCode,
  submitCode,
  getLeaderboard,
  getAdminWinners,
  disqualifyUser,
} = require("../controllers/challengeController");
const { isAuthenticated } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/role");

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/admin/winners", isAuthenticated, authorizeRoles("Admin"), getAdminWinners);
router.get("/status", isAuthenticated, getChallengeStatus);
router.get("/:day", isAuthenticated, getChallenge);
router.post("/run", isAuthenticated, runCode);
router.post("/submit", isAuthenticated, submitCode);
router.post("/disqualify", isAuthenticated, disqualifyUser);

module.exports = router;
