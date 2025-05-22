const Supplier = require("../models/supplier");

const AddSupplier = async (req, res) => {
  try {
    const { name, email, contact, gstno, address } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;
    const newSupplier = new Supplier({
      name,
      email,
      contact,
      gstno,
      address,
      profilePic,
    });

    await newSupplier.save();
    res.status(201).json({ message: "Supplier created", newSupplier });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSupplier = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(201).json({ message: "Supplier Get Successfully", suppliers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const UpdateSupplierData = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, gstno, address } = req.body;
  const image = req.file;
  if (!id) {
    return res.status(400).json({ error: "Missing supplier ID" });
  }
  try {
    const updatePayload = {
      name,
      email,
      contact,
      gstno,
      address,
    };
    if (image?.filename) {
      updatePayload.profilePic = image.filename;
    }
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res
      .status(200)
      .json({
        message: "Supplier updated successfully",
        data: updatedSupplier,
      });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update supplier",
      details: error.message,
    });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res
      .status(200)
      .json({ message: "Supplier deleted successfully", deletedSupplier });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  AddSupplier,
  getSupplier,
  deleteSupplier,
  UpdateSupplierData,
};
