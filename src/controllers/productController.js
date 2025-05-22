const productModel = require("../models/productModel");
// const Product = require("../models/productModel");

// Add Product
const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, supplierEmail, category, hsn } = req.body;
    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    const newProduct = new productModel({ name, supplierEmail, category, hsn, image });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, supplierEmail, category, hsn } = req.body;

    let updatedData = { name, supplierEmail, category, hsn };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
