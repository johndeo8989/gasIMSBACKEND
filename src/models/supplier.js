const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
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
  gstno: {
    type: String,
    unique: true,
    required: true,
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

const supplierModel = mongoose.model("suppliers", supplierSchema);

module.exports = supplierModel;
