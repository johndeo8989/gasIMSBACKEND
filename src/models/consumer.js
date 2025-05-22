const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    default: "Not provided",
    required: true,
  },
  contact: {
    type: String,
    default: "000-000-0000",
    required: true,
    unique: true,
  },
  aadharno: {
    type: String,
    default: "000-000-000",
    required: false,
  },
  cardNo: {
    type: String,
    required: true,
    unique: true,
  },
  customerType: {
    type: String,
    required: true,
    unique: false,
  },
  agency: {
    type: String,
    required: true,
  },
  consumerNo: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    required: false,
    default: "default-profile-pic.jpg",
  },
  aadharCard: {
    type: String,
    required: true,
  },
  bankPassbook: {
    type: String,
    required: true,
  },
  gasPassbook: {
    type: String,
    required: false,
  },
  rationCard: {
    type: String,
    required: false,
  },
  panCard: {
    type: String,
    required: false,
  },
  license: {
    type: String,
    required: false,
  },
  passport: {
    type: String,
    required: false,
  },
});

const consumerModel = mongoose.model("consumers", consumerSchema);

module.exports = consumerModel;
