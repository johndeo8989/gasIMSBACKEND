const express = require("express");
const {addCategory, getAllCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const ensureAuthenticated = require("../middlewares/Auth");

const router = express.Router();

router.post("/add", ensureAuthenticated, addCategory);
router.get("/get", ensureAuthenticated, getAllCategory);
router.put("/update/:id", ensureAuthenticated, updateCategory);
router.delete("/delete/:id", ensureAuthenticated, deleteCategory);

module.exports = router;