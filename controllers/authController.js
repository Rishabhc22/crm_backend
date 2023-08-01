const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");

// Handling the signup / registration / Creation of a new account

exports.sign_up = async (req, res) => {
  var newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  console.log(newUser);
  if (newUser.userId[0] == "A") {
    newUser.userType = constants.userTypes.admin;
    newUser.userStatus = constants.userStatus.approved;
  } else if (newUser.userId[0] == "E") {
    newUser.userType = constants.userTypes.engineer;
    newUser.userStatus = constants.userStatus.pending;
  }
  newUser.save(function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      return res.json(user);
    }
  });
};

// Handling SignIn feature

exports.sign_in = async (req, res) => {
  const filter = { email: req.body.email };
  const result = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(result);
  if (result != null) {
    const passwordValidator = result.comparePassword(req.body.password);
    if (passwordValidator == true) {
      if (result.userStatus == constants.userStatus.approved) {
        res.status(200).json({
          token: jwt.sign(
            { email: result.email, userId: result.userId, _id: result.id },
            "jwtPrivateKey"
          ),
        });
      } else {
        return res
          .status(401)
          .send("Unable to sign in account status Pending...");
      }
    } else {
      return res.send(401).send("Invalid Password");
    }
  } else {
    return res.status(401).send("Invalid Email");
  }
};
