const Category = require("../Models/Category");
const Course = require("../Models/Course");
const session = require("express-session");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
    });
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

    const categories = await Category.find({ slug: categorySlug });

    let filter = {};
    let courses = [];
    if (categorySlug) {
      for (let index = 0; index < categories.length; index++) {
        filter = { category: categories[index]._id };
        const foundCourses = await Course.find(filter);
        courses.push(foundCourses);
      }
      let flattenCourses = [].concat.apply([], courses);

      courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      });

      console.log("courses:>>", courses);
    } else {
      courses = await Course.find().sort("-created_at").populate("teacher").populate("category")
    }
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
