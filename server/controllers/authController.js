// /server/controllers/authController.js
const User = require("../models/User");
const sendToken = require("../utils/sendToken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Find highest rollNumber in database
    const lastUserWithRoll = await User.findOne({
      rollNumber: { $regex: /^0000[0-9]{4}$/ }
    }).sort({ rollNumber: -1 });

    let nextRollNumber = "00001001";
    if (lastUserWithRoll && lastUserWithRoll.rollNumber) {
      const lastNum = parseInt(lastUserWithRoll.rollNumber, 10);
      if (!isNaN(lastNum)) {
        nextRollNumber = String(lastNum + 1).padStart(8, "0");
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      rollNumber: nextRollNumber
    });

    sendToken(user, res);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: error.message || "Error creating user account" });
  }
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