const purchaseModel = require("../models/purchaseModel");
const { updateStock } = require("../utils/updateStock"); // Adjust path if needed
// Create new purchase
const createPurchase = async (req, res) => {
  try {
    const {
      date,
      dispatchNo,
      dispatchThrough,
      referenceNo,
      paidAmount,
      dueAmount,
      dueDate,
      totalPrice,
      paidStatus,
      paymentMode,
      payments,
      status,
      suplire_Email,
      product,
      supplierDetail,
    } = req.body;

    const newPurchase = new purchaseModel({
      date,
      dispatchNo,
      dispatchThrough,
      referenceNo,
      paidAmount,
      dueAmount,
      dueDate,
      totalPrice,
      paidStatus,
      paymentMode,
      payments,
      status,
      suplire_Email,
      product,
      supplierDetail,
    });

    const savedPurchase = await newPurchase.save();

    let insertCount = 0;
    let updateCount = 0;

    for (const prod of product) {
      const result = await updateStock(prod);

      if (result === "updated") updateCount++;
      else insertCount++;
    }
    res.status(201).json({
      message: "Purchase saved successfully",
      data: savedPurchase,
      inserted: insertCount,
      updated: updateCount,
    });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchaseModel.find({});
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Server error while fetching purchases" });
  }
};

const approvePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await purchaseModel.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase approved", updated });
  } catch (error) {
    console.error("Error in Approving Purchase");
    res.status(500).json({ message: "Server error" });
  }
};

const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await purchaseModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error("Error deleting purchase:", error);
    res.status(500).json({ message: "Server error during deletion" });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  deletePurchase,
  approvePurchase,
};
