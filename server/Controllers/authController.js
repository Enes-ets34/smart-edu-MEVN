const User = require("../Models/User");
const CryptoJS = require("crypto-js");
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
  req.session.destroy(() => {
    res.redirect("/");
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
  const user = await User.findOne({ _id: req.session.userID });
  if (user) {
    res.status(200).send({
      user,
    });
  } else {
    res.status(403).send("YOU ARE NOT AUTHORIZED");
  }
};
module.exports = {
  getAllUsers,
  register,
  login,
  logout,
  getDashboardPage,
};
