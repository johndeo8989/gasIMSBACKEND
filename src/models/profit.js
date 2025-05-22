const mongoose = require("mongoose");

const profitSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      required: true,
      type: String,
    },
    perUnitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Profit = mongoose.model("Profit", profitSchema);

module.exports = Profit;
