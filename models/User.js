const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
