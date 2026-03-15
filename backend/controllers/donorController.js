const DonationRecord = require("../models/DonationRecord");
const User = require("../models/User");

// Get Donor Profile
exports.getDonorProfile = async (req, res) => {
  try {
    const donor = await User.findById(req.user._id)
      .select("-password")
      .lean();

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied: Not a donor" });
    }

    const donationHistory = await DonationRecord.find({ donor: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    const totalDonations = donationHistory.length;
    const completedDonations = donationHistory.filter((r) => r.status === "Completed").length;
    const pendingDonations = donationHistory.filter((r) => r.status === "Pending").length;

    res.json({
      donorInfo: donor,
      stats: {
        totalDonations,
        completedDonations,
        pendingDonations,
      },
      donationHistory,
    });
  } catch (error) {
    console.error("Error fetching donor dashboard:", error);
    res.status(500).json({ message: "Error fetching donor profile" });
  }
};
// Update Donor Profile
exports.updateDonorProfile = async (req, res) => {
  try {
    const donor = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: "Error updating donor profile" });
  }
};

// Add Donation Record
exports.addDonationRecord = async (req, res) => {
  try {
    const { location, status, date } = req.body;

    // Get donor details from logged-in user
    const donor = await User.findById(req.user._id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Automatically take bloodGroup from donor profile
    const newRecord = await DonationRecord.create({
      donor: donor._id,
      bloodGroup: donor.bloodGroup,
      location,
      status,
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding donation record" });
  }
};

// Get Donation History
exports.getDonationHistory = async (req, res) => {
  try {
    const records = await DonationRecord.find({ donor: req.user._id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donation history" });
  }
};

// Delete a Donation Record
exports.deleteDonationRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await DonationRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Donation record not found" });
    }

    // Only the donor who created it can delete
    if (record.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied: Not your donation record" });
    }

    await record.deleteOne();

    res.json({ message: "Donation record deleted successfully" });
  } catch (error) {
    console.error("Error deleting donation record:", error);
    res.status(500).json({ message: "Error deleting donation record" });
  }
};

// 📊 Donor Leaderboard
exports.getDonorLeaderboard = async (req, res) => {
  try {
    const donors = await User.aggregate([
      { $match: { role: "donor", isVerified: true } },
      {
        $lookup: {
          from: "donationrecords",
          localField: "_id",
          foreignField: "donor",
          as: "donations",
        },
      },
      {
        $addFields: {
          totalDonations: { $size: "$donations" },
          lastDonation: { $max: "$donations.date" },
        },
      },
      { $sort: { totalDonations: -1, lastDonation: -1 } },
      { $limit: 10 },
    ]);

    res.json(donors);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error loading leaderboard" });
  }
};

