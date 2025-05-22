const express = require("express");
const router = express.Router();
const {
  AddSupplier,
  getSupplier,
  UpdateSupplierData,
  deleteSupplier,
} = require("../controllers/SupplierController");
const upload = require("../middlewares/upload");

router.post("/add", (req, res, next) => {
  upload.single("profilePic")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    AddSupplier(req, res);
  });
});

router.get("/get", getSupplier);
router.put("/update/:id", upload.single("profilePic"), UpdateSupplierData);
router.delete("/delete/:id", deleteSupplier);

module.exports = router;
