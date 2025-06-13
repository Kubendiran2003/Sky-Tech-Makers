// /server/controllers/blogController.js
const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body, author: req.user._id });
  res.json(blog);
};

// Get all approved blogs
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ approved: true }).populate("author", "name");
  res.json(blogs);
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name");
  blog.views++;
  await blog.save();
  res.json(blog);
};

// Approve a blog (Admin only)
exports.approveBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ msg: "Approved" });
};

// Delete a blog (Admin only)
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// ✅ NEW: Get all blogs pending approval (Admin only)
exports.getPendingBlogs = async (req, res) => {
  const pendingBlogs = await Blog.find({ approved: false }).populate("author", "name");
  res.json(pendingBlogs);
};
