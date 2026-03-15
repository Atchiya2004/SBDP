const Request = require("../models/Request");
const User = require("../models/User");
const DonationRecord = require("../models/DonationRecord");
const Notification = require("../models/Notification"); 

exports.requestBlood = async (req, res) => {
  try {
    const { bloodGroup, location } = req.body;

    if (!bloodGroup || !location) {
      return res.status(400).json({ message: "Blood group and location are required" });
    }

    const newRequest = await Request.create({
      recipient: req.user._id,
      bloodGroup,
      location,
      status: "Pending",
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error in requestBlood:", error);
    res.status(500).json({ message: "Error requesting blood" });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ recipient: req.user._id })
      .populate("matchedDonor", "name email bloodGroup location")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Error in getMyRequests:", error);
    res.status(500).json({ message: "Error fetching request status" });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { status, matchedDonor } = req.body;

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (status) request.status = status;
    if (matchedDonor) request.matchedDonor = matchedDonor;

    await request.save();

    if (status === "Completed" && matchedDonor) {
      await DonationRecord.create({
        donor: matchedDonor,
        bloodGroup: request.bloodGroup,
        location: request.location,
        status: "Completed",
        date: new Date(),
      });

      await Notification.create({
        user: matchedDonor,
        type: "info",
        message: `Your donation for ${request.bloodGroup} blood at ${request.location} has been successfully completed.`,
      });
    }

    res.json({ message: "Request updated successfully", request });
  } catch (error) {
    console.error("Error in updateRequest:", error);
    res.status(500).json({ message: "Error updating request" });
  }
};

exports.autoMatchDonor = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId).populate("recipient");
    if (!request) return res.status(404).json({ message: "Request not found" });

    const donors = await User.find({
      bloodGroup: request.bloodGroup,
      location: request.location,
      role: "donor",
      isVerified: true,
    });

    if (!donors.length) {
      return res.status(404).json({ message: "No matching donors found" });
    }

    const eligibleDonors = [];

    for (const donor of donors) {
      const lastDonation = await DonationRecord.findOne({
        donor: donor._id,
        status: "Completed",
      }).sort({ date: -1 });

      const daysSinceLast = lastDonation
        ? (new Date() - new Date(lastDonation.date)) / (1000 * 60 * 60 * 24)
        : 9999;

      if (daysSinceLast >= 90) eligibleDonors.push(donor);
    }

    if (!eligibleDonors.length) {
      return res.status(404).json({ message: "No eligible donors found (90-day rule)" });
    }

    const matchedDonor = eligibleDonors[0];
    request.status = "Matched";
    request.matchedDonor = matchedDonor._id;
    await request.save();

    await Notification.create({
      user: matchedDonor._id,
      type: "alert",
      message: `You’ve been matched with a recipient who needs ${request.bloodGroup} blood at ${request.location}.`,
    });

    await Notification.create({
      user: request.recipient._id,
      type: "info",
      message: `A donor (${matchedDonor.name}) has been matched for your ${request.bloodGroup} blood request.`,
    });

    res.json({
      message: `Donor ${matchedDonor.name} matched successfully!`,
      donor: matchedDonor,
      request,
    });
  } catch (error) {
    console.error("Error in autoMatchDonor:", error);
    res.status(500).json({ message: "Error auto-matching donor" });
  }
};


exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this request" });
    }

    await request.deleteOne();
    res.json({ message: "Request cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling request" });
  }
};
