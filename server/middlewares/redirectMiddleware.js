const User = require("../Models/User");

module.exports = async (req, res, next) => {
  if (req.session.userID) {
    return res.redirect("/");
  }
  next();
};
