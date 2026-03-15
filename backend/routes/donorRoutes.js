const express = require("express");
const {
  getDonorProfile,
  updateDonorProfile,
  addDonationRecord,
  getDonationHistory,
  deleteDonationRecord,
  getDonorLeaderboard
} = require("../controllers/donorController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, roleMiddleware("donor"), getDonorProfile);
router.put("/profile", authMiddleware, roleMiddleware("donor"), updateDonorProfile);
router.post("/add-record", authMiddleware, roleMiddleware("donor"), addDonationRecord);
router.get("/history", authMiddleware, roleMiddleware("donor"), getDonationHistory);
router.delete("/history/:id", authMiddleware, roleMiddleware("donor"), deleteDonationRecord);
router.get("/leaderboard", authMiddleware, getDonorLeaderboard);

module.exports = router;
