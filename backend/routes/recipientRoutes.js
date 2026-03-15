const express = require("express");
const {
  requestBlood,
  updateRequest,
  getMyRequests,
  autoMatchDonor,
  deleteRequest,
} = require("../controllers/recipientController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/request", authMiddleware, roleMiddleware("recipient"), requestBlood);
router.get("/status", authMiddleware, roleMiddleware("recipient"), getMyRequests);
router.put("/request/:id", authMiddleware, roleMiddleware("admin"), updateRequest);
router.delete("/request/:id", authMiddleware, roleMiddleware("recipient"), deleteRequest);

router.post("/match", authMiddleware, roleMiddleware("admin"), autoMatchDonor);

module.exports = router;
