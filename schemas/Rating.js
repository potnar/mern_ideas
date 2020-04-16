const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    value: { type: Number, min: 0, max: 5, required: true },
  },
  {
    strict: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
