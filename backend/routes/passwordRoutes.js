const express = require("express");
const { forgotPassword, verifyResetLink, resetPassword } = require("../controllers/passwordController");

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", verifyResetLink);
router.post("/reset-password/:id/:token", resetPassword);

module.exports = router;
