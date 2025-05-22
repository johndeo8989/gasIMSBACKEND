const express = require("express");
const {addProduct, getAllProducts, updateProduct, deleteProduct} = require("../controllers/productController");
const ensureAuthenticated = require("../middlewares/Auth");
const upload = require('../middlewares/upload');

const router = express.Router();

router.post("/add", ensureAuthenticated, upload.single("image"), addProduct);
router.get("/get", ensureAuthenticated, getAllProducts);
router.put("/update/:id", ensureAuthenticated, upload.single("image"), updateProduct);
router.delete("/delete/:id", ensureAuthenticated, deleteProduct);

module.exports = router;