const User = require("../models/userModel");
const constants = require("../utils/constants");

// Middleware to check is user is an admin or not.

exports.isAdmin = async (req, res, next) => {
  console.log("This is the userId", req.user.userId);
  console.log(req.user.userType);
  const user = await User.findOne({ userId: req.user.userId });
  console.log("This is the userType", user.userType);

  if (user && user.userType == constants.userTypes.admin) {
    next();
  } else {
    return res
      .status(403)
      .send("You're not authorized. Please contact the Admin");
  }
};

// Validate the body of the update request

exports.validateUpdate = async (req, res, next) => {
  if (req.url.includes("admin")) {
    // For updation on personal user fields

    if (req.body.password || req.body.contact) {
      return res
        .status(500)
        .send({ message: "Personal fields can only be updated by the User" });
    }

    // On updations on tickets
  }

  if (req.url.includes("user")) {
    if (req.body.user.Type || req.body.userStatus || req.body.email) {
      return res.status(500).send({
        message:
          "Only personal field updations allowed. Please contact Admin for rest.",
      });
    }
  }

  next();
};
