const express = require("express");

const router = express.Router();

const {
  createProfit,
  getAllProfit,
  getProfitByName,
  updateProfit,
  deleteProfit,
} = require("../controllers/profitController");

router.post("/create", createProfit);
router.get("/all", getAllProfit);
router.get("/:getProfitByName", getProfitByName);
router.put("/:expenseId", updateProfit);
router.delete("/:expenseId", deleteProfit);

module.exports = router;
