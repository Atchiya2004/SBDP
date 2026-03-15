const express = require("express");
const {
  getAllUsers,
  getAllRequests,
  getAllDonations,
  toggleVerifyUser,
  deleteUser,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get("/requests", authMiddleware, roleMiddleware("admin"), getAllRequests);
router.get("/donations", authMiddleware, roleMiddleware("admin"), getAllDonations);

router.put("/user/:id/verify", authMiddleware, roleMiddleware("admin"), toggleVerifyUser);
router.delete("/user/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;
