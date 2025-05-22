const Expense = require("../models/expense");

// CREATE Expense
const createExpense = async (req, res) => {
  try {
    const {
      date,
      expensePrice,
      expenseType,
      shortNarration,
      longNarration,
      additionalInfo,
    } = req.body;
    const bill = req.file ? `/uploads/${req.file.filename}` : null;
    const newExpense = new Expense({
      date,
      expensePrice,
      expenseType,
      shortNarration,
      longNarration,
      additionalInfo,
      bill,
    });

    await newExpense.save();

    return res.status(201).json({
      message: "Expense Created Successfully!",
      expense: newExpense,
    });
    return;
  } catch (error) {
    return res.status(500).json({
      message: "Error Creating Expense",
      error,
    });
  }
};

//  Get Expense

const getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find();

    return res.status(200).json({
      message: "All Expenses Fetched Successfully",
      expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching expenses",
      error,
    });
  }
};

// Get ExpenseByType
const getExpensesByType = async (req, res) => {
  try {
    const { expenseType } = req.params;

    const expenses = await Expense.find({ expenseType });

    return res.status(200).json({
      message: `Expenses for type: ${expenseType} fetched successfully`,
      expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching expenses by type",
      error,
    });
  }
};

// Update expense

const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const { date, expensePrice, expenseType, shortNarration, longNarration } =
      req.body;

    let additionalInfo = {};
    if (req.body.additionalInfo) {
      try {
        additionalInfo = JSON.parse(req.body.additionalInfo);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid additionalInfo format" });
      }
    }

    const updateData = {
      date,
      expensePrice,
      expenseType,
      shortNarration,
      longNarration,
      additionalInfo,
    };

    if (req.file) {
      updateData.bill = req.file.filename; // or req.file.path
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updateData,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating expense",
      error,
    });
  }
};

// Delete Expense

const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      expense: deletedExpense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting expense",
      error,
    });
  }
};

module.exports = {
  createExpense,
  getAllExpense,
  getExpensesByType,
  updateExpense,
  deleteExpense,
};
