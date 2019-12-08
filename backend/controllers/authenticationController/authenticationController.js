const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;

const catchError = require("../../errorHandlers/errorHandlers").catchError;
const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;
const User = require("../../model/User/User");
const ResetPassword = require("../../model/ResetPassword/ResetPassword");
const utilities = require("../utilities/cryptoAsync/cryptoAsync");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: process.env.SEND_GRID_KEY
    }
  })
);

exports.signup = async (req, res, next) => {
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
    const sendEmailSuccess = await transporter.sendMail({
      to: email,
      from: "outlay-manager.com",
      subject: "Your registration was successful. Welcome!",
      html: "<h1>Registration was successful!</h1>",
      body:
        "<h4>Welcome to Outlay Manager. Just sign in with your new credentials now. We hope that you will find our application useful!</h4>"
    });
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

exports.resetPasswordRequest = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await User.findByEmail(email);
    catchError("userNotRegistered", user);
    const oldTokenExists = await ResetPassword.findBy(null, user._id);
    if (oldTokenExists) {
      res.status(200).json({
        message: "A mail was already sent! Please check your email account!"
      });
    } else {
      const token = await utilities.cryptoAsync(32);
      const expirationTime = moment()
        .add(1, "hours")
        .utc(true)
        .toISOString();
      const resetPasswordRequest = new ResetPassword(
        user._id,
        token,
        expirationTime
      );
      let saveResponse = await resetPasswordRequest.save();
      catchError("insertOne", saveResponse);
      const emailStatus = await transporter.sendMail({
        to: email,
        from: "outlay-manager.com",
        subject: "Reset password",
        html: `<h2>Did you want to change your password?</h2>
        <h4><a href="http://localhost:3000/resetPassword/${token}">Follow this link to reset your password.</a></h4>
        `
      });
      catchError("emailWasNotSent", emailStatus);
      res.json({
        message: "We sent you a mail. Please check your email account!"
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const password = req.body.password;
  const token = req.body.token;
  try {
    const registeredToken = await ResetPassword.findBy(token, null);
    catchError("isRegisteredToken", registeredToken);
    const userId = ObjectId(registeredToken._id);
    if (
      registeredToken.expirationTime <
      moment()
        .utc(true)
        .toISOString()
    ) {
      res.status(401).json({ message: "The token expired!" });
      let deleteResponse = await ResetPassword.deleteById(registeredToken._id);
      catchError("deleteOne", deleteResponse);
    } else {
      const user = await User.findById(userId);
      catchError("userNotRegistered", user);
      let hashedPassword = await bcrypt.hash(password, 12);
      catchError("hashPassword", hashedPassword);
      let updateResponse = await User.updateUserPassword(
        userId,
        hashedPassword
      );
      catchError("updateOne", updateResponse);
      let deleteResponse = await ResetPassword.deleteById(userId);
      catchError("deleteOne", deleteResponse);
      res.status(200).json({ message: "The password was reset successfully!" });
    }
  } catch (error) {
    next(error);
  }
};
