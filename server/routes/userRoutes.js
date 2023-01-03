const express = require("express");

const authController = require("../Controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const router = express.Router();

router.route("/signup").post(redirectMiddleware,authController.register);
router.route("/login").post(redirectMiddleware,authController.login);
router.route("/logout").get(authController.logout);
router.route("/").get(authController.getAllUsers);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);

module.exports = router;
