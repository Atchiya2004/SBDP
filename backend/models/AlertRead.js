const mongoose = require("mongoose");

const alertReadSchema = new mongoose.Schema({
  alert: { type: mongoose.Schema.Types.ObjectId, ref: "Alert" },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seenAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AlertRead", alertReadSchema);
