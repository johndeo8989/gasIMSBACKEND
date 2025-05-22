const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.get("/", stockController.getAllStock);
router.put("/updateSellingPrice/:id", stockController.updateSellingPrice);
router.get("/:productId", stockController.getStockByProductId);
module.exports = router;
