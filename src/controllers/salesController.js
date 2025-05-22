const SellData = require("../models/sales"); // Check path

// CREATE SALE
exports.saveSellData = async (req, res) => {
  try {
    const {
      date,
      invoice_number,
      sell_no,
      dispatch_no,
      products,
      customer_no,
      customer_name,
      customer_address,
      customer_contact,
      customer_type,
      total_amount,
      payment,
    } = req.body;

    const newSellData = new SellData({
      date,
      invoice_number,
      sell_no,
      dispatch_no,
      products,
      customer_no,
      customer_name,
      customer_address,
      customer_contact,
      customer_type,
      total_amount,
      payment,
    });

    await newSellData.save();

    res.status(201).json({
      message: "Sale data saved successfully",
      sale: newSellData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving sale data",
      error: error.message,
    });
  }
};

// GET ALL SALES
exports.getAllSellData = async (req, res) => {
  try {
    const sales = await SellData.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching sale data",
      error: error.message,
    });
  }
};

// GET SINGLE SALE
exports.getSingleSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SellData.findById(id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching sale data",
      error: error.message,
    });
  }
};

// UPDATE SALE
exports.updateSingleSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedSale = await SellData.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json({
      message: "Sale updated successfully",
      sale: updatedSale,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating sale",
      error: error.message,
    });
  }
};

// DELETE SALE
exports.deleteSell = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await SellData.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting sale",
      error: error.message,
    });
  }
};

// UPDATE PAYMENT DETAILS
exports.updatePaymentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = req.body;

    const updatedSale = await SellData.findByIdAndUpdate(
      id,
      { payment }, // Replaces the entire payment object
      { new: true, runValidators: true }
    );

    if (!updatedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      sale: updatedSale,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating payment",
      error: error.message,
    });
  }
};
