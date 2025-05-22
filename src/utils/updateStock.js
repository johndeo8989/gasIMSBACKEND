const Stock = require("../models/stock"); // Adjust the path based on your structure

const updateStock = async (product) => {
  const costPrice = product.perUnitPrice;
  const sellingPrice = costPrice * 1.2;

  const existingStock = await Stock.findOne({
    product_Name: product.product_Name,
  });

  if (existingStock) {
    existingStock.quantity += product.noOfUnit;
    existingStock.costPrice = costPrice;
    existingStock.sellingPrice = sellingPrice;
    await existingStock.save();
    return "updated";
  } else {
    const newStock = new Stock({
      product_Name: product.product_Name,
      category_name: product.category_name,
      hsn: product.hsn,
      quantity: product.noOfUnit,
      costPrice: costPrice,
      sellingPrice: sellingPrice,
      dispatchNo: product.dispatchNo, // Optional, based on your schema
      tax: {
        taxName: product.taxName,
        taxPer: product.taxPer,
      },
    });

    await newStock.save();
    return "inserted";
  }
};

module.exports = { updateStock };
