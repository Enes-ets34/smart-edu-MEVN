const Category = require("../Models/Category");
const Course = require("../Models/Course");
const User = require("../Models/User");
const slugify = require("slugify");
const session = require("express-session");
const nodemailer = require("nodemailer");

// create a new course
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

// update an existing course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        img: req.body.img,
        slug: slugify(req.body.title, {
          lower: true,
          strict: true,
        }),
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

// delete a course
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

// get all courses, with optional filtering by category and/or search key
const getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const searchKey = req.query.search;

    const categories = await Category.find({ slug: categorySlug });

    let filter = {};
    let courses = [];

    // filter by category and search key
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

      // flatten the array and remove duplicates
      let flattenCourses = [].concat.apply([], courses);
      (courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      })),
        (courses = [...new Set(courses.map(JSON.stringify))].map(JSON.parse));
    }

    // filter by search key only
    else if (!categorySlug && searchKey) {
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
    }

    // filter by category only
    else if (categorySlug && !searchKey) {
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

      (courses = [...flattenCourses].sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      })),
        (courses = [...new Set(courses.map(JSON.stringify))].map(JSON.parse));
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
// get single course
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
//enroll course
const enrollCourse = async (req, res) => {
  try {
    // Find the course by ID
    const course = await Course.findById({ _id: req.body.course_id });
    // Find the user by ID
    const user = await User.findById(req.body.user_id);
    // Add the course to the user's list of enrolled courses
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    // Compose the email message with course details and send it
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
      <b> <a href='https://smartedu-ets.netlify.app/#/courses/${course.slug}'>Click for get to the course.</a></b>
    `;

    // Create a transporter object to send the email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL, // gmail account
        pass: process.env.PASSWORD, // gmail password
      },
    });

    // Send the email
    let info = await transporter.sendMail({
      from: `"Smart EDU Contact Form" ${process.env.MAIL} `, // sender address
      to: user.email, // list of receivers
      subject: "Smart EDU - Enrolled Course Successfully ???", // Subject line
      html: outputMessage, // html body
    });

    // Respond with a success message and the user object
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    // Respond with an error message and the error object
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
//release course
const releaseCourse = async (req, res) => {
  try {
    // Find user by id and remove course from user's courses list
    const user = await User.findById(req.body.user_id);
    delete user.password;
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    // Send response with updated user object
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    // Handle error if user or course is not found
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
