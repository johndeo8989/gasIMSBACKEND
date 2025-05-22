const taxModel = require('../models/tax');

  const addTax = async (req, res) => {
    try {
      const { name, percentage } = req.body;
  
      if (!name || !percentage) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const tax = new taxModel({ name, percentage });
      await tax.save();
  
      res.status(201).json({ message: "Tax added successfully", tax });
    } catch (err) {
      console.error("Add Tax Error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const getAllTaxes = async (req, res) => {
    try {
      const taxes = await taxModel.find();
      res.status(200).json(taxes);
    } catch (err) {
      console.error("Get Tax Error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const updateTax = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, percentage } = req.body;
  
      if (!name || !percentage) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updatedTax = await taxModel.findByIdAndUpdate(
        id,
        { name, percentage },
        { new: true }
      );
  
      if (!updatedTax) {
        return res.status(404).json({ message: "Tax not found" });
      }
  
      res.status(200).json({ message: "Tax updated successfully", updatedTax });
    } catch (err) {
      console.error("Update Tax Error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const deleteTax = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTax = await taxModel.findByIdAndDelete(id);
  
      if (!deletedTax) {
        return res.status(404).json({ message: "Tax not found" });
      }
  
      res.status(200).json({ message: "Tax deleted successfully" });
    } catch (err) {
      console.error("Delete Tax Error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };

  module.exports = {addTax, getAllTaxes, updateTax, deleteTax}