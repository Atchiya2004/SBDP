const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    bloodGroup: String,
    location: String,
    message: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
