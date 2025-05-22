const categoryModel = require("../models/category");

const addCategory = async (req, res) => {
     try {
        console.log("request body: ", req.body);
        const {category} = req.body;
        if(!category) return res.status(400).json({message: "Category is required"});

        const newCategory = new categoryModel({category});
        await newCategory.save();
        res.status(201).json({message: "category added successfully", category: newCategory });

     } catch (error) {
        console.error("add category:", error);
        res.status(500).json({message: "Server Error"});
     }
}

const getAllCategory = async (req, res) => {
    try {
        const categoryList = await categoryModel.find();
        res.status(200).json(categoryList);
    } catch (error) {
        console.error("Get category error:", error);
        res.status(500).json({message: "Server Error"});
    }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const updated = await categoryModel.findByIdAndUpdate(id, { category }, { new: true });
    res.status(200).json({ message: "category updated", updated });
  } catch (error) {
    console.error("Update category Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "category deleted" });
  } catch (error) {
    console.error("Delete category Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
    addCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}