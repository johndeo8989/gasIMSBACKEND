const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  product_Name: { type: String, required: true },
  category_name: String,
  hsn: String,
  quantity: Number,
  costPrice: Number,
  sellingPrice: Number,
  dispatchNo: String,
  tax: {
    taxName: String,
    taxPer: Number,
  },
});
module.exports = mongoose.model("Stock", stockSchema);
