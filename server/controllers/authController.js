// /server/controllers/authController.js
const crypto = require("crypto");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");

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
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 1,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
  }).json({ msg: "Logged out" });
};

exports.getProfile = (req, res) => {
  res.json({ user: req.user });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Please enter your registered email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "No account found with this email address" });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset url
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you requested a password reset for your Sky Tech Makers account.\n\nPlease click on the following link to reset your password:\n\n${resetUrl}\n\nThis link will expire in 15 minutes. If you did not request this, please ignore this email.`;

    const html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Sky Tech Makers</h1>
          <p style="color: #e0e7ff; margin-top: 5px; font-size: 14px;">Password Reset Request</p>
        </div>
        <div style="padding: 30px; color: #334155; line-height: 1.6;">
          <p style="font-size: 16px;">Hello <strong>${user.name || "User"}</strong>,</p>
          <p style="font-size: 15px;">We received a request to reset the password for your Sky Tech Makers account associated with <strong>${user.email}</strong>.</p>
          <p style="font-size: 15px;">Click the button below to set up a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">Reset Password</a>
          </div>
          <p style="font-size: 13px; color: #64748b;">Or copy and paste this link into your browser:</p>
          <p style="font-size: 13px; word-break: break-all; color: #4f46e5; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;">${resetUrl}</p>
          <p style="font-size: 13px; color: #94a3b8; margin-top: 20px;">This link will expire in <strong>15 minutes</strong>. If you did not request a password reset, no action is required.</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Sky Tech Makers - Password Reset Token",
        message,
        html,
      });

      res.status(200).json({
        success: true,
        msg: `Password reset link sent to ${user.email}`,
      });
    } catch (err) {
      console.error("Email send error:", err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ msg: "Email could not be sent. Please try again later." });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ msg: error.message || "Server error processing password reset" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });
    }

    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired password reset token" });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Clear any active auth cookie so user must sign in with new credentials
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 1,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
    }).json({ success: true, msg: "Password updated successfully. Please sign in with your new password." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ msg: error.message || "Server error resetting password" });
  }
};