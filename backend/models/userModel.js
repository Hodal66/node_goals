const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name can't be empty"],
    },
    email: {
      type: String,
      required: [true, "User email can't be empty"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User can't be empty"],
      maxLength: 200,
      minLength: 5,
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model("User", userSchema);
