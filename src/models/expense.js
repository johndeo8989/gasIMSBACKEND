const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    bill: {
      type: String,
      required: false,
      default: "default-profile-pic.jpg",
    },
    date: {
      type: Date,
      required: true,
    },
    expensePrice: {
      type: Number,
      required: true,
    },
    expenseType: {
      type: String,
      required: true,
      enum: [
        "salary",
        "transport",
        "maintenance",
        "rent",
        "marketing",
        "stationary",
        "utility",
        "petty",
      ],
    },
    shortNarration: {
      type: String,
    },
    longNarration: {
      type: String,
    },

    additionalInfo: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      // can hold designation, totalPerson, work, rentName, etc.
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
