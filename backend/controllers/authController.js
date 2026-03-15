const User = require("../models/User"); 
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
};


exports.register = async (req, res) => {
  const { name, email, password, role, bloodGroup, location } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role, bloodGroup, location });

    const token = generateToken(user._id);
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${user._id}/${token}`;

    try {
      await sendEmail(
        email,
        "Verify your email",
        `<p>Welcome ${name}!</p>
        <p>Please click the link below to verify your email:</p>
        <a href="${verifyLink}">${verifyLink}</a>`
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({ message: "Registration failed. Could not send verification email." });
    }

    res.status(201).json({ message: "Registration successful. Check your email for verification link." });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error in registration" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { id, token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== id) return res.status(400).json({ message: "Token does not match user" });

    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "Invalid user" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Email verification error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const token = generateToken(user._id);
    res.json({ token, role: user.role, name: user.name, id: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.resendVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    const token = generateToken(user._id);
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${user._id}/${token}`;

    await sendEmail(
      email,
      "Resend Email Verification",
      `<p>Hello ${user.name},</p>
       <p>Please click the link below to verify your email:</p>
       <a href="${verifyLink}">${verifyLink}</a>`
    );

    res.json({ message: "Verification email resent. Check your inbox." });
  } catch (err) {
    console.error("Resend verification error:", err);
    res.status(500).json({ message: "Failed to resend verification email" });
  }
};

exports.getProfile = async (req, res) => {
  res.json(req.user);
};
