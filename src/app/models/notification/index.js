const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", Notification);
