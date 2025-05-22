const express = require("express");
const router = express.Router();
const {
  createConsumer,
  getConsumerData,
  UpdateConsumerData,
  deleteConsumer,
  getSingleConsumer,
} = require("../controllers/ConsumerController");

const upload = require("../middlewares/upload");

router.post(
  "/add",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "passbook", maxCount: 1 },
    { name: "rationCard", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "bankPassbook", maxCount: 1 },
    { name: "gasPassbook", maxCount: 1 },
  ]),
  createConsumer
);

// Get Consumer Data
router.get("/get", getConsumerData);
router.get("/singleconsumer/:id", getSingleConsumer);
// UPDATE COnsumer Data
router.put(
  "/update/:id",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "passbook", maxCount: 1 },
    { name: "rationCard", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  UpdateConsumerData
);

router.delete("/delete/:id", deleteConsumer);

module.exports = router;
