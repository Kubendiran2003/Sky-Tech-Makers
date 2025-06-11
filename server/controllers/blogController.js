// /server/controllers/blogController.js
const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body, author: req.user._id });
  res.json(blog);
};

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ approved: true }).populate("author", "name");
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name");
  blog.views++;
  await blog.save();
  res.json(blog);
};

exports.approveBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ msg: "Approved" });
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};