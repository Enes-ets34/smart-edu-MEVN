const User = require("../Models/User");

module.exports = async (req, res, next) => {
  const id = req.session.userID;

  // Check if the user ID exists in the session
  if (id) {
    const user = await User.findOne({ _id: id });
    console.log("user :>> ", user);
    console.log("id :>> ", id);

    // If the user is not found, return an error response
    if (!user || user === null) {
      return res.send("YOU ARE NOT AUTHORIZED FOR THIS ROUTE");
    }
  }

  // Call the next middleware in the chain
  next();
};
