const express = require("express");
const { register, login, verifyEmail,resendVerification,getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:id/:token", verifyEmail);
router.post("/resend-verification", resendVerification);
router.get("/profile", authMiddleware, getProfile); 

router.get(
  "/admin-dashboard",
  authMiddleware,              
  roleMiddleware("admin"),     
  (req, res) => {
    res.json({ message: "Welcome Admin! You have access to this route." });
  }
);

module.exports = router;
