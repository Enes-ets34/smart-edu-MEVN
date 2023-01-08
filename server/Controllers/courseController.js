const Category = require("../Models/Category");
const Course = require("../Models/Course");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    const courses = await Course.find(filter).sort('-created_at')
    res.status(200).json({
      status: "success",
      courses,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getSingleCourse,
};
