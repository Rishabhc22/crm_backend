const jwt = require("jsonwebtoken");

exports.isTokenValid = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(" ");

    if (auth[0] === "JWT") {
      jwt.verify(auth[1], "jwtPrivateKey", function (err, decode) {
        if (err) {
          req.user = undefined;
          next();
        } else {
          req.user = decode;
          console.log(decode);
          next();
        }
      });
    } else {
      req.user = undefined;
      next();
    }
  } else {
    req.user = undefined;
    next();
  }
};

// Checks if login is required
exports.isLogiRequired = function (req, res, next) {
  if (req.user) next();
  else {
    return res.status(401).send("Unauthorized User");
  }
};

// Retriences user information

exports.get_profile = function (req, res, next) {
  if (req.user) {
    res.status(200).send(req.user);
    next();
  } else {
    return res.status(401).send("Invalid Token");
  }
};
