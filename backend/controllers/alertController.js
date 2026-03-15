const User = require("../models/User");
const Alert = require("../models/Alert");
const AlertRead = require("../models/AlertRead");
const Notification = require("../models/Notification"); 
const sendEmail = require("../utils/sendEmail");

exports.sendEmergencyAlert = async (req, res) => {
  try {
    const { bloodGroup, location, message } = req.body;

    const donors = await User.find({
      role: "donor",
      bloodGroup,
      location,
      isVerified: true,
    });

    console.log("🔍 Donors found:", donors.map((d) => d.email));

    if (donors.length === 0)
      return res.status(404).json({ message: "No donors found for emergency alert" });

    
    const alert = await Alert.create({
      bloodGroup,
      location,
      message,
      createdBy: req.user._id,
    });

    
    for (const donor of donors) {
      await Notification.create({
        user: donor._id,
        type: "emergency",
        message: `🚨 Urgent need for ${bloodGroup} blood at ${location}. Please check your email for details.`,
      });

      
      const seenLink = `${process.env.CLIENT_URL}/alert/${alert._id}/seen?donor=${donor._id}`;
      const emailBody = `
        <p><strong>🚨 Emergency Blood Request!</strong></p>
        <p>Urgent need for <b>${bloodGroup}</b> blood at <b>${location}</b>.</p>
        <p>${message || ""}</p>
        <p><a href="${seenLink}">Click here if you can help or to confirm you’ve seen this alert.</a></p>
      `;
      sendEmail(donor.email, "Emergency Blood Request", emailBody);
    }

    
    await Notification.create({
      user: req.user._id,
      type: "info",
      message: `Emergency alert sent successfully to all matching ${bloodGroup} donors in ${location}.`,
    });

    res.json({ message: "Emergency alerts sent successfully", alert });
  } catch (error) {
    console.error("❌ Error sending emergency alerts:", error);
    res.status(500).json({ message: "Error sending emergency alerts" });
  }
};


exports.markAlertAsSeen = async (req, res) => {
  try {
    const donorId = req.user?._id || req.body.donorId || req.query.donor;
    const alertId = req.body.alertId || req.params.id;

    if (!donorId || !alertId) {
      return res.status(400).send("<h2>❌ Missing donorId or alertId.</h2>");
    }

    await AlertRead.findOneAndUpdate(
      { donor: donorId, alert: alertId },
      { seenAt: new Date() },
      { upsert: true, new: true }
    );

    await Notification.create({
      user: donorId,
      type: "info",
      message: "Thank you for responding to the emergency alert!",
    });

    
    res.send(`
      <h2 style="text-align:center;color:green;">✅ Thank you!</h2>
      <p style="text-align:center;">Your response has been recorded successfully.</p>
    `);
  } catch (error) {
    console.error("Error marking alert as seen:", error);
    res.status(500).send("<h2>❌ Failed to record your response.</h2>");
  }
};

exports.getAlertHistory = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    for (const alert of alerts) {
      const seenRecords = await AlertRead.find({ alert: alert._id })
        .populate("donor", "name email");
      alert.seenBy = seenRecords.map((r) => r.donor);
    }

    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alert history:", error);
    res.status(500).json({ message: "Error fetching alert history" });
  }
};
