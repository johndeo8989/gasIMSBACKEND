const Profit = require("../models/profit");

// CREATE Expense
const createProfit = async (req, res) => {
  try {
    const { date, productName, quantity, perUnitPrice, totalPrice } = req.body;
    const newProfit = new Profit({
      date,
      productName,
      quantity,
      perUnitPrice,
      totalPrice,
    });

    await newProfit.save();

    return res.status(201).json({
      message: "Profit Created Successfully!",
      expense: newProfit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Creating Profit",
      error,
    });
  }
};

//  Get Expense

const getAllProfit = async (req, res) => {
  try {
    const profit = await Profit.find();

    return res.status(200).json({
      message: "All Expenses Fetched Successfully",
      profit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching expenses",
      error,
    });
  }
};

// Get ExpenseByType
const getProfitByName = async (req, res) => {
  try {
    const { productName } = req.params;

    const profit = await Profit.find({ productName });

    return res.status(200).json({
      message: `Expenses for type: ${expenseType} fetched successfully`,
      profit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching expenses by type",
      error,
    });
  }
};

// Update expense

const updateProfit = async (req, res) => {
  try {
    const { profitId } = req.params;

    const { date, productName, quantity, perUnitPrice, totalPrice } = req.body;

    const updateData = {
      date,
      productName,
      quantity,
      perUnitPrice,
      totalPrice,
    };

    if (req.file) {
      updateData.bill = req.file.filename; // or req.file.path
    }

    const updatedExpense = await Profit.findByIdAndUpdate(
      profitId,
      updateData,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
      profit: updatedExpense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating expense",
      error,
    });
  }
};

// Delete Expense

const deleteProfit = async (req, res) => {
  try {
    const { profitId } = req.params;
    const deletedProfit = await Profit.findByIdAndDelete(expenseId);

    if (!deletedProfit) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      profit: deletedProfit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting expense",
      error,
    });
  }
};

module.exports = {
  createProfit,
  getAllProfit,
  getProfitByName,
  updateProfit,
  deleteProfit,
};
