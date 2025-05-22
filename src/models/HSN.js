const mongoose = require("mongoose");

const hsnSchema = new mongoose.Schema({
  hsn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

module.exports = mongoose.model("HSN", hsnSchema);
