const mongoose = require("mongoose");

const donationRecordSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now }, 
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
    centre: { type: String }, 
    quantity: { type: Number }, 
    status: { type: String, default: "Completed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonationRecord", donationRecordSchema);
