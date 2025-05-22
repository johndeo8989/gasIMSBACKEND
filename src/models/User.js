const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "operator", "deliveryBoy"], // Allowed roles
    default: "operator", // Default role for new users
  },

  photo: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "000-000-0000",
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },

  dob: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
