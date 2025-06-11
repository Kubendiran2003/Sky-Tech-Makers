// /server/utils/sendToken.js
const jwt = require("jsonwebtoken");

const sendToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    sameSite: "Lax",
    secure: false,
  });

  res.json({ success: true, user });
};

module.exports = sendToken;