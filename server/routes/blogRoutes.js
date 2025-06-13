// /server/routes/blogRoutes.js
const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  approveBlog,
  deleteBlog,
  getPendingBlogs,
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/role");

const router = express.Router();

router.post("/", isAuthenticated, createBlog);
router.get("/", getBlogs);
router.get("/pending", isAuthenticated, authorizeRoles("Admin"), getPendingBlogs);
router.get("/:id", getBlogById);
router.put("/:id/approve", isAuthenticated, authorizeRoles("Admin"), approveBlog);
router.delete("/:id", isAuthenticated, authorizeRoles("Admin"), deleteBlog);

module.exports = router;