const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: { type: String, required: true }
  },
  {
    strict: true
  }
);

module.exports = mongoose.model("Comment", commentSchema);
