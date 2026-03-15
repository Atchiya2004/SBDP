const express = require("express");
const router = express.Router();
const { getSummaryReports } = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware("admin"), getSummaryReports);

module.exports = router;
