const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;
  await sendEmail(email, "Reset Password", `Reset your password here: ${link}`);

  res.json({ message: "Reset email sent" });
};

exports.verifyResetLink = async (req, res) => {
  try {
    jwt.verify(req.params.token, process.env.JWT_SECRET);
    res.json({ message: "Valid link" });
  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    user.password = password;
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch {
    res.status(400).json({ message: "Reset failed" });
  }
};
