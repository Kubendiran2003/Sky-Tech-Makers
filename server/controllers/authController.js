// /server/controllers/authController.js
const User = require("../models/User");
const sendToken = require("../utils/sendToken");

exports.signup = async (req, res) => {
  const user = await User.create(req.body);
  sendToken(user, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ msg: "Invalid credentials" });
  sendToken(user, res);
};

exports.logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 }).json({ msg: "Logged out" });
};

exports.getProfile = (req, res) => {
  res.json(req.user);
};