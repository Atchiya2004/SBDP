const User = require("../models/User");
const Request = require("../models/Request");
const DonationRecord = require("../models/DonationRecord");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.toggleVerifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = !user.isVerified;
    await user.save();

    res.json({
      message: `User ${user.isVerified ? "verified" : "unverified"} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating verification status" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};


exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("recipient")
      .populate("matchedDonor");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};


exports.getAllDonations = async (req, res) => {
  try {
    const donations = await DonationRecord.find().populate("donor");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donation records" });
  }
};
