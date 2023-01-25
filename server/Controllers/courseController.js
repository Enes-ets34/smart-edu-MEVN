const Category = require("../Models/Category");
const Course = require("../Models/Course");
const User = require("../Models/User");

const session = require("express-session");
const nodemailer = require("nodemailer");

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

      (courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      })),
        (courses = [...new Set(courses.map(JSON.stringify))].map(JSON.parse));
      console.log("courses :>> ", courses);
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

<<<<<<< HEAD
      courses = 
        [...flattenCourses].sort((a, b) => {
          return b.created_at.getTime() - a.created_at.getTime();
        }),
    
      courses = [...new Set(courses.map(JSON.stringify))].map(JSON.parse);
=======
      (courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      })),
        (courses = [...new Set(courses.map(JSON.stringify))].map(JSON.parse));
>>>>>>> dev-enes
      console.log("courses :>> ", courses);
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
    const course = await Course.findById({ _id: req.body.course_id });
    const user = await User.findById(req.body.user_id);
    if (!user.courses.includes(req.body.course_id)) {
      await user.courses.push({ _id: req.body.course_id });
      await user.save();
      res.status(200).json({
        status: "success",
        user,
      });
    } else {
      res.status(400).json({
        status: "fail",
      });
    }
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    const outputMessage = `
  <h1>Mail Details </h1>
  <ul>
    <li>Name: ${user.full_name}</li>
    <li>Email: ${user.email}</li>
  </ul>
  <h1>Course</h1>
<hr/>
  <img style='width:300px;' src='${course.img}'/>

  <h2 style='font-size:50px'>${course.title}</h2>
  <p style='font-size:25px'> ${course.description}</p>
  <b> <a href='http://localhost:8080/course/${course.slug}'>Click for get to the course.</a></b>

  `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ets.34.es@gmail.com", // gmail account
        pass: "qtxsampiigdyuovb", // gmail password
      },
    });
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <ets.34.es@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Smart EDU - Enrolled Course Successfully ✔", // Subject line
      html: outputMessage, // html body
    });
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
<<<<<<< HEAD
  console.log("buraya istek geldi");
  try {
    const user = await User.findById(req.body.user_id);
=======
  try {
    const user = await User.findById(req.body.user_id);
    delete user.password;
>>>>>>> dev-enes
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
  enrollCourse,
  releaseCourse,
  getAllCourses,
  getSingleCourse,
  enrollCourse,
  releaseCourse,
};
