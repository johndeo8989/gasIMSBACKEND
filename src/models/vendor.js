const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    default: "000-000-0000",
    required: true,
    unique: true,
  },
  shopName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    default: "Not provided",
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
    default: "default-profile-pic.jpg",
  },
});

const vendorModel = mongoose.model("vendors", vendorSchema);

module.exports = vendorModel;
