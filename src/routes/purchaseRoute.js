const express = require("express");
const router = express.Router();
const {
  createPurchase,
  getAllPurchases,
  deletePurchase,
  approvePurchase,
} = require("../controllers/PurchaseController");
const ensureAuthenticated = require("../middlewares/Auth");

router.post("/add", ensureAuthenticated, createPurchase);
router.get("/get", getAllPurchases);
router.delete("/delete/:id", ensureAuthenticated, deletePurchase);
router.put("/approve/:id", ensureAuthenticated, approvePurchase);

module.exports = router;
