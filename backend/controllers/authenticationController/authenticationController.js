const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const catchError = require("../../errorHandlers/errorHandlers").catchError;
const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;
const User = require("../../model/User/User");

exports.signup = async (req, res, next) => {
  const db = getDbAccess();
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findByEmail(email);
    catchError("accountAvailability", user);
    const hashedPassword = await bcrypt.hash(password, 12);
    catchError("hashPassword", hashedPassword);
    const newUser = new User(null, fullName, email, hashedPassword);
    let response = await newUser.save();
    catchError("insertOne", response);
    res.status(201).json({ message: "The account was created successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findByEmail(email);
    catchError("userNotRegistered", user);
    let isPasswordValid = await bcrypt.compare(password, user.password);
    catchError("isPasswordValid", isPasswordValid);
    let token = jwt.sign({ user_id: user._id.toString() }, process.env.SALT, {
      expiresIn: "1h"
    });
    res.status(200).json({
      message: "Login was sucessful!",
      token,
      user_id: user._id,
      expirationTime: 3601 
    });
  } catch (error) {
    next(error);
  }
};
