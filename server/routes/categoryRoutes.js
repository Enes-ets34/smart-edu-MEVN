const express = require("express");

const categoryController = require("../Controllers/categoryController");
const router = express.Router();




router.route("/").post(categoryController.createCategory);
router.route("/").get(categoryController.getAllCategories);


module.exports = router;
