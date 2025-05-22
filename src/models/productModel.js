const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    supplierEmail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true  
    },
    hsn: {
        type: String,
        required: true  
    },
    image: {
        type: String,
        default: "",
    }
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;