const User = require("../Models/User");

// Array of allowed roles
const roles = ["admin", "teacher"];

// Middleware function that checks if the user has a valid role
const roleMiddleware = (req, res, next) => {
  const id = req.session.userID;
  const userRole = req.body.role;

  // If the user role is included in the allowed roles, call the next function in the middleware stack
  if (roles.includes(userRole)) {
    next();
  } else {
    // Otherwise, return a 401 status code with an error message
    return res.status(401).send("YOU CANT DO IT");
  }
};

module.exports = {
  roleMiddleware,
};
