const ObjectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");

exports.checkSignupCredentials = (req, res, next) => {
  if (req.body.fullName && req.body.email && req.body.password) {
    next();
  } else {
    let error = new Error(
      "Request failed. Request did not have all the values necessary for this endpoint!"
    );
    error.statusCode = 400;
    throw error;
  }
};

exports.checkSigninCredentials = (req, res, next) => {
  if (req.body.email && req.body.password) {
    next();
  } else {
    let error = new Error(
      "Request failed. Request did not have all the values necessary for this endpoint!"
    );
    error.statusCode = 400;
    throw error;
  }
};

exports.checkAuthentication = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  const token = authorizationHeader.split(" ")[1];
  let decodedToken;
  if (!token) {
    let error = new Error("The user is not logged in!");
    error.statusCode = 401;
    throw error;
  }
  try {
    decodedToken = jwt.verify(token, process.env.SALT);
    if (!decodedToken) {
      let error = new Error("Invalid token. Authentication failed!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
  req.userId = decodedToken.user_id;
  next();
};
