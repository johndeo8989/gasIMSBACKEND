const HSNModel = require("../models/HSN");

// Add HSN
const addHSN = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // 👀 log incoming data
    const { hsn } = req.body;
    if (!hsn) return res.status(400).json({ message: "HSN is required" });

    const newHSN = new HSNModel({ hsn });
    await newHSN.save();

    res.status(201).json({ message: "HSN added successfully", hsn: newHSN });
  } catch (error) {
    console.error("Add HSN Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all HSNs
const getAllHSNs = async (req, res) => {
  try {
    const hsnList = await HSNModel.find();
    res.status(200).json(hsnList);
  } catch (error) {
    console.error("Get HSN Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update HSN
const updateHSN = async (req, res) => {
  try {
    const { id } = req.params;
    const { hsn } = req.body;

    const updated = await HSNModel.findByIdAndUpdate(id, { hsn }, { new: true });
    res.status(200).json({ message: "HSN updated", updated });
  } catch (error) {
    console.error("Update HSN Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete HSN
const deleteHSN = async (req, res) => {
  try {
    const { id } = req.params;
    await HSNModel.findByIdAndDelete(id);
    res.status(200).json({ message: "HSN deleted" });
  } catch (error) {
    console.error("Delete HSN Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addHSN,
  getAllHSNs,
  updateHSN,
  deleteHSN,
};
