import axios from "../../../../http/axios";
import * as actionTypes from "../actionTypes/actionTypes";

export const resetPasswordStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START,
  };
};

export const resetPasswordRequest = (body, modalHandler) => {
  return (dispatch) => {
    dispatch(resetPasswordStart());
    axios
      .put("/authentication/resetPasswordRequest", body)
      .then((res) => {
        modalHandler(
          "We sent a mail to your registered email account. Please check your mail."
        );
        dispatch(resetPasswordSuccess(res.data));
      })
      .catch((error) => {
        const errorType =
          error.response !== undefined || null
            ? error.response.data.message
            : error;
        let errorData = null;
        switch (errorType) {
          case "This user does not have an account and should register!":
            errorData = {
              type: "formError",
              message: "Not a registered user account",
              statusCode: 401,
            };
            modalHandler(
              "This user does not have an account and should register!"
            );
            break;
          case "A mail was already sent! Please check your email account!":
            errorData = {
              type: "formError",
              message: "A mail was already sent.",
              statusCode: 401,
            };
            modalHandler(
              "A mail was already sent! Please check your email account!"
            );
            break;
          case "The email value was not present.":
            errorData = {
              type: "formError",
              message: "The request did not have all the values.",
              statusCode: 400,
            };
            modalHandler("Enter your email!");
            break;
          default:
            errorData = { type: "serverError", error };
            modalHandler("Something went wrong. Try again later!");
            break;
        }
        dispatch(resetPasswordFailed(errorData));
      });
  };
};

export const resetPassword = (body, modalHandler, setResetSuccess) => {
  return (dispatch) => {
    dispatch(resetPasswordStart());
    axios
      .put("/authentication/resetPassword", body)
      .then((res) => {
        setResetSuccess(true);
        modalHandler(
          "Your password was changed successfully. Login with your new password."
        );
        dispatch(resetPasswordSuccess(res.data));
      })
      .catch((error) => {
        const errorType =
          error.response !== undefined || null
            ? error.response.data.message
            : error;
        let errorData = null;
        switch (errorType) {
          case "The token expired!":
            setResetSuccess(true);
            errorData = {
              type: "formError",
              message: "The token expired!",
              statusCode: 401,
            };
            modalHandler("The token expired! Please try again.");
            break;
          case "The token is invalid!":
            setResetSuccess(true);
            errorData = {
              type: "formError",
              message: "The token expired!",
              statusCode: 401,
            };
            modalHandler("The token is invalid! Try again.");
            break;
          case "This user does not have an account and should register!":
            errorData = {
              type: "formError",
              message: "Not a registered user account",
              statusCode: 401,
            };
            modalHandler(
              "This user does not have an account and should register!"
            );
            break;
          case "Request failed. Request did not have all the values necessary for this endpoint!":
            errorData = {
              type: "formError",
              message: "The request did not have all the values.",
              statusCode: 400,
            };
            modalHandler(
              "Request did not have all the values necessary for this endpoint!"
            );
            break;
          default:
            errorData = { type: "serverError", error };
            modalHandler("Something went wrong. Try again later!");
            break;
        }
        dispatch(resetPasswordFailed(errorData));
      });
  };
};

export const resetPasswordSuccess = (successData) => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    successData,
  };
};

export const resetPasswordFailed = (error) => {
  return {
    type: actionTypes.RESET_PASSWORD_FAILED,
    error: error,
  };
};
