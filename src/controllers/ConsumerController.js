const Consumer = require("../models/consumer");
const path = require("path");
const fs = require("fs");

const createConsumer = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      contact,
      cardNo,
      agency,
      consumerNo,
      customerType,
      aadharno,
    } = req.body;
    const images = req.files;

    const newConsumer = new Consumer({
      name,
      email,
      address,
      contact,
      cardNo,
      agency,
      customerType,
      consumerNo,
      aadharno,
      profilePic:
        images["profilePic"]?.[0]?.filename || "default-profile-pic.jpg",
      aadharCard: images["aadharCard"]?.[0]?.filename || null,
      bankPassbook: images["bankPassbook"]?.[0]?.filename || null,
      gasPassbook: images["gasPassbook"]?.[0]?.filename || null,
      rationCard: images["rationCard"]?.[0]?.filename || null,
      panCard: images["panCard"]?.[0]?.filename || null,
      license: images["license"]?.[0]?.filename || null,
      passport: images["passport"]?.[0]?.filename || null,
    });

    // Save to DB
    await newConsumer.save();

    res.status(201).json({
      message: "Consumer created successfully",
      consumer: newConsumer,
    });
  } catch (error) {
    console.error("Error creating consumer:", error);
    res
      .status(500)
      .json({ error: "Failed to create consumer", details: error.message });
  }
};

// GET Consumer Data
const getConsumerData = async (req, res) => {
  try {
    const consumer = await Consumer.find();
    res.status(201).json({ message: "Consumer Get Successfully", consumer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleConsumer = async (req, res) => {
  const { id } = req.params;
  try {
    const consumer = await Consumer.findById(id);
    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }
    res
      .status(200)
      .json({ message: "Consumer fetched successfully", consumer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const UpdateConsumerData = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, cardNo, address, aadharno } = req.body;
  const images = req.files;

  if (!id) return res.status(400).json({ error: "Missing supplier ID" });

  try {
    const updatedData = await Consumer.findByIdAndUpdate(
      id,
      {
        name,
        email,
        contact,
        cardNo,
        address,
        aadharno,
        profilePic:
          images["profilePic"]?.[0]?.filename || "default-profile-pic.jpg",
        passbook: images["passbook"]?.[0]?.filename || null,
        rationCard: images["rationCard"]?.[0]?.filename || null,
        aadharCard: images["aadharCard"]?.[0]?.filename || null,
        panCard: images["panCard"]?.[0]?.filename || null,
        license: images["license"]?.[0]?.filename || null,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update Customer",
      details: error.message,
    });
  }
};

const deleteConsumer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedConsumer = await Consumer.findByIdAndDelete(id);
    if (!deletedConsumer) {
      return res.status(404).json({ error: "Consumer not found" });
    }
    res
      .status(200)
      .json({ message: "Consumer deleted successfully", deletedConsumer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createConsumer,
  getConsumerData,
  UpdateConsumerData,
  deleteConsumer,
  getSingleConsumer,
};
