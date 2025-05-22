const express = require("express");
const router = express.Router();
const {
  AddVendor,
  getVendors,
  UpdateVendorData,
  deleteVendor,
} = require("../controllers/VendorController");
const upload = require("../middlewares/upload");

router.post("/add", (req, res, next) => {
  upload.single("profilePic")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    AddVendor(req, res);
  });
});

router.get("/get", getVendors);

router.put("/update/:id", upload.single("profilePic"), UpdateVendorData);

router.delete("/delete/:id", deleteVendor);

module.exports = router;
