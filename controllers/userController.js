const User = require("../models/userModel");
const constants = require("../utils/constants");
const ObjectConverter = require("../utils/ObjectConverter");
const bcrypt = require("bcrypt");

// Fetching the users based on usertype and userstatus

exports.getUsers = async (req, res) => {
  let userTypequery = req.query.userType;
  let userStatusquery = req.query.userStatus;

  // Logic to fetch users

  var users;

  if (userTypequery && userStatusquery) {
    try {
      users = await User.find({
        userType: userTypequery,
        userStatus: userStatusquery,
      });
    } catch (ex) {
      console.log(
        "Error while fetching data for :",
        userTypequery,
        " & ",
        userStatusquery
      );
      res.status(500).send({ message: "Some internal error occured." });
    }
  } else if (userTypequery) {
    try {
      users = await User.find({ userType: userTypequery });
    } catch (ex) {
      console.log("Error while fetching data for : ", userTypequery);
      res.status(500).send({
        message: "Some internal error occured while fetching the users",
      });
    }
  } else if (userStatusquery) {
    try {
      users = await User.find({ userStatus: userStatusquery });
    } catch (ex) {
      console.log("Error while fetching data for : ", userStatusquery);
      res.status(500).send({ message: "Some internal error occured." });
    }
  }
  res.status(200).send(ObjectConverter.userResponse(users));
};

// Admin Update

exports.adminUpdate = async (req, res) => {
  let userIdparam = req.params.userId;
  let req_status = req.body.userStatus;
  let req_email = req.body.email;
  console.log(userIdparam);

  try {
    var user = await User.findOneAndUpdate(
      {
        userId: userIdparam,
      },
      {
        userStatus: req_status,
        email: req_email,
      }
    );

    console.log(user);
    res.status(200).send({ message: "Data has been updated successfully" });
  } catch (ex) {
    res.status(500).send({
      message: `Update failed for ${userIdparam}. Some internal error occured.`,
    });
  }
};

// Individual users Updates

exports.userUpdate = async (req, res) => {
  let newPassword = bcrypt.hashSync(req.body.password, 10);
  let newContact = req.body.contact;

  try {
    let updateUser = await User.findOneAndUpdate(
      {
        usedId: req.user.userId,
      },
      {
        password: newPassword,
        contact: newContact,
      }
    );
    res.status(200).send({ message: "Data has been updated successfully." });
  } catch (ex) {
    res.status(500).send({
      message: `Data couldn't be updated. Some Internal error occured.`,
    });
  }
};
