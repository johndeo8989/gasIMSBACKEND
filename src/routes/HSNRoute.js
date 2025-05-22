const express = require("express");
const { addHSN, getAllHSNs, updateHSN, deleteHSN } = require("../controllers/HSNController");
const ensureAuthenticated  = require("../middlewares/Auth");

const router = express.Router();

router.post("/add", ensureAuthenticated, addHSN);
router.get("/all", ensureAuthenticated, getAllHSNs);
router.put("/update/:id", ensureAuthenticated, updateHSN);
router.delete("/delete/:id", ensureAuthenticated, deleteHSN);

module.exports = router;
