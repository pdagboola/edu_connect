require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../models/userModel");

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (!user)
    return res.status(404).json({ success: false, data: "User not found" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const resetUrl = `http://localhoset:${process.env.PORT}/auth/reset/${token}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    res
      .status(200)
      .json({ success: true, data: "Password reset link sent to your email." });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: "Failed to send reset email.",
    });
  }
};

module.exports = resetPassword;
