const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        percentage: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)
const taxModel = mongoose.model("Tax", taxSchema);

module.exports = taxModel;