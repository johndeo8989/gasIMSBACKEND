const Vendor = require("../models/vendor");const AddVendor = async (req, res) => {
  try {
    const { name, email, contact, shopName, address } = req.body;
    const profilePic = req.file ? `${req.file.filename}` : null;

    const newVendor = new Vendor({
      name,
      email,
      contact,
      shopName,
      address,
      profilePic,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor created", newVendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ message: "Vendors fetched successfully", vendors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const UpdateVendorData = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, shopName, address } = req.body;
  const images = req.file;

  if (!id) return res.status(400).json({ error: "Missing vendor ID" });

  try {
    const updatedData = await Vendor.findByIdAndUpdate(
      id,
      {
        name,
        email,
        contact,
        shopName,
        address,
        profilePic: images.filename || "default-profile-pic.jpg",
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update vendor",
      details: error.message,
    });
  }
};

const deleteVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVendor = await Vendor.findByIdAndDelete(id);
    if (!deletedVendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res
      .status(200)
      .json({ message: "Vendor deleted successfully", deletedVendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  AddVendor,
  getVendors,
  UpdateVendorData,
  deleteVendor,
};
