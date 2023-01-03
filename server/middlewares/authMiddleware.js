const User = require("../Models/User");

module.exports = async (req, res, next) => {
  const id = req.session.userID;
  if (id) {
    const user = await User.findOne({ _id: id });
    console.log("user :>> ", user);
    console.log("id :>> ", id);
    if (!user || user === null) {
      res.send("YOU ARE NOT AUTHORIZED FOR THIS ROUTE");
    }
  }
  next();
};
