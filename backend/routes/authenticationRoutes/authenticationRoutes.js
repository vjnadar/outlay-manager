const express = require("express");
const router = express.Router();

const authenticationController = require("../../controllers/authenticationController/authenticationController");
const authentication = require("../../middlewares/validators/authentication/authenticationValidator");

router.post(
  "/signup",
  authentication.checkSignupCredentials,
  authenticationController.signup
);

router.post(
  "/signin",
  authentication.checkSigninCredentials,
  authenticationController.signin
);

router.put(
  "/resetPasswordRequest",
  authentication.checkResetPasswordRequest,
  authenticationController.resetPasswordRequest
);

router.put(
  "/resetPassword",
  authentication.checkResetPassword,
  authenticationController.resetPassword
);

module.exports = router;
