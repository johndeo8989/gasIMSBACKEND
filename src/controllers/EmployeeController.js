const Employee = require("../models/employee");

// CREATE Expense
const createEmployee = async (req, res) => {
  try {
    const { date, empName, empID, desig } = req.body;
    const newEmployee = new Employee({
      date,
      empName,
      empID,
      desig,
    });

    await newEmployee.save();

    return res.status(201).json({
      message: "Profit Created Successfully!",
      expense: newEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Creating Profit",
      error,
    });
  }
};

//  Get Expense

const getAllEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();

    return res.status(200).json({
      message: "All Expenses Fetched Successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching expenses",
      error,
    });
  }
};

// Get ExpenseByType
const getEmpByName = async (req, res) => {
  try {
    const { empName } = req.params;

    const employee = await Employee.find({ empName });

    return res.status(200).json({
      message: `Expenses for type: ${expenseType} fetched successfully`,
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching expenses by type",
      error,
    });
  }
};

// Update expense

const updateEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    const { date, empName, empID, desig } = req.body;

    const updateData = { date, empName, empID, desig };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      empId,
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
      profit: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating expense",
      error,
    });
  }
};

// Delete Expense

const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const deletedEmp = await Employee.findByIdAndDelete(empId);

    if (!deletedEmp) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      profit: deletedEmp,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting expense",
      error,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployee,
  getEmpByName,
  updateEmployee,
  deleteEmployee,
};
