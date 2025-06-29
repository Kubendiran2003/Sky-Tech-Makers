// /server/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "Login required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};