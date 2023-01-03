const User = require("../Models/User");

const register = async (req, res) => {
  try {
    const userData = req.body;
    console.log("req.body.password :>> ", userData.password);
    console.log("userData :>> ", userData);

    const User = await User.create(userData);
    res.status(201).json({
      status: "success",
      User,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
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

module.exports = {
  register,
  getAllUsers,
};
