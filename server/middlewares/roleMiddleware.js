const User = require("../Models/User");

const roles = ["admin", "teacher"];
const roleMiddleware = (req, res, next) => {
  const id = req.session.userID;

  const userRole = req.body.role;
  if (roles.includes(userRole)) {
    next();
  } else {
    return res.status(401).send("YOU CANT DO IT");
  }
};
module.exports = {
  roleMiddleware,
};
