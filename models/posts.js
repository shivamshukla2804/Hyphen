const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "Public",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
