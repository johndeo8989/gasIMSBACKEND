const express = require("express");
const {addTax, getAllTaxes, updateTax, deleteTax} = require("../controllers/TaxController");
const ensureAuthenticated  = require("../middlewares/Auth");

const router = express.Router();
router.post("/addtax", ensureAuthenticated, addTax);
router.get('/getalltax', ensureAuthenticated, getAllTaxes);
router.put("/updatetax/:id", ensureAuthenticated, updateTax);
router.delete("/deletetax/:id", ensureAuthenticated, deleteTax);

module.exports = router;
