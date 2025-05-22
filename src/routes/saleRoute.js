const express = require("express");
const {
  saveSellData,
  getAllSellData,
  getSingleSale,
  updateSingleSale,
  updatePaymentDetails,
  deleteSell,
} = require("../controllers/salesController");

const router = express.Router();

// CREATE a new sale
router.post("/", saveSellData);

// READ all sales
router.get("/", getAllSellData);

// READ a single sale by ID
router.get("/:id", getSingleSale);

// UPDATE entire sale by ID
router.put("/:id", updateSingleSale);

// UPDATE only payment details
router.put("/payment/:id", updatePaymentDetails);

// DELETE a sale by ID
router.delete("/:id", deleteSell);

module.exports = router;
