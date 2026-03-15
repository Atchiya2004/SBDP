const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bloodGroup: String,
  location: String,
  status: { type: String, enum: ["Pending", "Matched", "Completed"], default: "Pending" },
  matchedDonor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
