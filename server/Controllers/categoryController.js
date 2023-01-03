const Category = require("../Models/Category");

const createCategory = async (req, res) => {

  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
