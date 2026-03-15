const User = require("../models/User");
const Donation = require("../models/DonationRecord");
const Request = require("../models/Request");

exports.getSummaryReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: "donor" });
    const totalRecipients = await User.countDocuments({ role: "recipient" });
    const totalRequests = await Request.countDocuments();
    const totalDonations = await Donation.countDocuments();

    const bloodGroupStats = await Donation.aggregate([
      { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      totalUsers,
      totalDonors,
      totalRecipients,
      totalRequests,
      totalDonations,
      bloodGroupStats,
    });
  } catch (error) {
    console.error("Error generating reports:", error);
    res.status(500).json({ message: "Error generating reports" });
  }
};
