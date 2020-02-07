const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    strict: true
  }
);

module.exports = mongoose.model("Idea", ideaSchema);
