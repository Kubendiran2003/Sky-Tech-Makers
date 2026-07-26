// /server/utils/sendToken.js
const jwt = require("jsonwebtoken");

const sendToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );

  const isProduction = process.env.NODE_ENV === "production";
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 7;

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: cookieExpireDays * 24 * 60 * 60 * 1000,  // e.g. 7 days in ms
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,  // false on localhost HTTP, true on production HTTPS
  });

  res.json({ success: true, user });
};

module.exports = sendToken;