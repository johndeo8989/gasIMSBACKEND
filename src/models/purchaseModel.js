const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paymentMode: { type: String, required: true },
  referenceNo: { type: String }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  product_Name: { type: String, required: true },
  category_name: { type: String },
  hsn: { type: String },
  noOfUnit: { type: Number, required: true },
  perUnitPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  taxName: { type: String },
  taxPer: { type: Number },
  image: { type: String }
}, { _id: false });

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  contact: { type: String },
  address: { type: String },
  gstno: { type: String },
  profilePic: { type: String }
}, { _id: false });

const PurchaseSchema = new mongoose.Schema({
  date: { type: String, required: true },
  dispatchNo: { type: String },
  dispatchThrough: { type: String },
  referenceNo: { type: String },
  paidAmount: { type: Number, required: true },
  dueAmount: { type: Number, default: 0 },
  dueDate: { type: String, default: "" },
  totalPrice: { type: Number, required: true },
  paidStatus: { type: String, enum: ['paid', 'unpaid', 'partial'], required: true },
  paymentMode: { type: String },
  payments: [PaymentSchema],
  status: { type: String, default: "Pending" },
  suplire_Email: { type: String },
  product: [ProductSchema],
  supplierDetail: SupplierSchema
}, { timestamps: true });

const purchaseModel = mongoose.model('Purchase', PurchaseSchema);

module.exports = purchaseModel