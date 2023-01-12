const express = require("express");

const courseController = require("../Controllers/courseController");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const router = express.Router();

router.route("/").post(roleMiddleware, courseController.createCourse);
router.route("/:id").put(roleMiddleware, courseController.updateCourse);
router.route("/:id").delete(courseController.deleteCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getSingleCourse);

module.exports = router;
