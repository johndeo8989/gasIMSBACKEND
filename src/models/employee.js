const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    empName: {
      type: String,
      required: true,
    },
    empID: {
      required: true,
      type: String,
    },
    desig: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
