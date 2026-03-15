const express = require("express");
const {
  sendEmergencyAlert,
  getAlertHistory,
  markAlertAsSeen,
  getAlertHistoryWithSeen,
} = require("../controllers/alertController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/send", authMiddleware, roleMiddleware("admin"), sendEmergencyAlert);

router.get("/history", authMiddleware, roleMiddleware("admin"), getAlertHistory);

router.post("/seen", authMiddleware, roleMiddleware("donor"), markAlertAsSeen);

router.get("/:id/seen", markAlertAsSeen);

module.exports = router;
