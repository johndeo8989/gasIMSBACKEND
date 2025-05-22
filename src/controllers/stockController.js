const Stock = require("../models/stock");

exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find(); // You can add filters or limits
    res.status(200).json(stock);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve stock", error: err.message });
  }
};
exports.getStockByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const stock = await Stock.find({ productId });

    if (!stock || stock.length === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json(stock);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving stock", error: err.message });
  }
};

exports.updateSellingPrice = async (req, res) => {
  const { id } = req.params;
  const { sellingPrice } = req.body;
  console.log(id, sellingPrice);
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { sellingPrice: sellingPrice },
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    res.status(200).json({
      message: "Selling Price Updated Successfully",
      stock: updatedStock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update selling price",
      error: error.message,
    });
  }
};
