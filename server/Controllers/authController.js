const User = require("../Models/User");
const Course = require("../Models/Course");
const CryptoJS = require("crypto-js");
const { encryptedBase64 } = require("crypto-js");
const session = require("express-session");
const _saltKey = "passB!tch";

const register = async (req, res) => {
  try {
    const userData = req.body;
    console.log("req.body.password :>> ", userData.password);
    console.log("userData :>> ", userData);

    const user = await User.create(userData);
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
    console.error(error);
  }
};
const login = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (user) {
      userData.password = CryptoJS.HmacSHA1(
        userData.password,
        _saltKey
      ).toString();
    }
    if (user.password === userData.password) {
      req.session.userID = user._id;
   

      res.status(200).json({
        status: "success",
        user,
      });
    } else {
      res.status(400).send("INCORRECT PASSWORD OR EMAIL");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
    console.error(error);
  }
};
const logout = (req, res) => {
  res.status(200).send({
    status: "success",
  });
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
const getDashboardPage = async (req, res) => {
  const user = await User.findById(req.params.id).populate("courses");
  const courses = await Course.find({ teacher: req.params.id });
  res.status(200).send({
    user,
    courses,
  });

  console.log("user :>> ", user);
};
module.exports = {
  getAllUsers,
  register,
  login,
  logout,
  getDashboardPage,
};
