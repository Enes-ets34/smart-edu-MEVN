const express = require("express");
const pageController = require("../Controllers/pageController");

const router = express.Router();

router.route("/").get(pageController.getHomePage);
router.route("/about").get(pageController.getAboutPage);



module.exports = router;
