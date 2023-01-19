const Category = require("../Models/Category");
const Course = require("../Models/Course");
const session = require("express-session");
const User = require("../Models/User");

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
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        img: req.body.img,
      },
      { returnOriginal: false }
    );
    res.status(204).json({
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
const deleteCourse = async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.id });
    res.status(204).json({
      status: "success",
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
    const searchKey = req.query.search;

    const categories = await Category.find({ slug: categorySlug });

    let filter = {};
    let courses = [];
    if (categorySlug && searchKey) {
      for (let index = 0; index < categories.length; index++) {
        filter = { category: categories[index]._id, title: searchKey };
        const foundCourses = await Course.find({
          $or: [
            { title: { $regex: ".*" + filter.title + ".*", $options: "i" } },
            { category: filter.category },
          ],
        })
          .populate("teacher")
          .populate("category")
          .exec();
        courses.push(foundCourses);
      }
      let flattenCourses = [].concat.apply([], courses);

      courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      });

      console.log("courses:>>", courses);
    } else if (!categorySlug && searchKey) {
      filter = { title: searchKey };
      courses = await Course.find({
        $or: [
          { title: { $regex: ".*" + filter.title + ".*", $options: "i" } },
          { category: filter.category },
        ],
      })
        .populate("teacher")
        .populate("category")
        .exec();
    } else if (categorySlug && !searchKey) {
      for (let index = 0; index < categories.length; index++) {
        filter = { category: categories[index]._id, title: searchKey };
        const foundCourses = await Course.find({
          category: filter.category,
        })
          .populate("teacher")
          .populate("category")
          .exec();
        courses.push(foundCourses);
      }
      let flattenCourses = [].concat.apply([], courses);

      courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      });
    } else {
      courses = await Course.find()
        .sort("-created_at")
        .populate("teacher")
        .populate("category")
        .exec();
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
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("teacher")
      .populate("category")
      .exec();
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
const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
const releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    delete user.password;
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();
    res.status(200).json({
      status: "success",
      user,
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
  updateCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
  enrollCourse,
  releaseCourse,
};
