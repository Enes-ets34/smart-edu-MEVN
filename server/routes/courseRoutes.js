const express = require("express");

const courseController = require("../Controllers/courseController");
const router = express.Router();




router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getSingleCourse);

module.exports = router;
