const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Idea" }]
  },
  {
    strict: true
  }
);

module.exports = mongoose.model("Category", categorySchema);
