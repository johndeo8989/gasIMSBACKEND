const express = require("express");

const router = express.Router();
const upload = require("../middlewares/upload");

const {
  createExpense,
  getAllExpense,
  getExpensesByType,
  updateExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

router.post("/create", (req, res, next) => {
  upload.single("bill")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    createExpense(req, res);
  });
});
router.get("/all", getAllExpense);
router.get("/:expenseType", getExpensesByType);
router.put("/:expenseId", upload.single("bill"), updateExpense);
router.delete("/:expenseId", deleteExpense);

module.exports = router;
