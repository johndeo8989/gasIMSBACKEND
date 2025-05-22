const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Date of sale
  invoice_number: { type: String, required: true },
  sell_no: { type: String, required: true },
  dispatch_no: { type: String },

  // Minimal product info (you can use ObjectId reference if needed)
  products: [
    {
      name: { type: String, required: true },
      category: { type: String },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      gstPercent: { type: Number },
      total: { type: Number },
    },
  ],

  // Basic customer info
  customer_no: { type: String, required: true },
  customer_name: { type: String, required: true },
  customer_address: { type: String, required: true },
  customer_contact: { type: String },
  customer_type: { type: String }, // Retailer, Distributor, etc.
  total_amount: { type: Number, required: true }, // Final amount

  // Optional payment summary
  payment: {
    status: {
      type: String,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid",
    },
    paid: { type: Number, default: 0 },
    due: { type: Number, default: 0 },
    method: { type: String }, // Cash, Online, etc.
    date: { type: Date },
  },
});

const SellData = mongoose.model("SellData", sellSchema);
module.exports = SellData;
