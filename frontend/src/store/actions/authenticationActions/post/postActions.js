import axios from "../../../../http/axios";
import * as actionTypes from "../../authenticationActions/actionTypes/actionTypes";
import * as logoutActions from "../index";

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START
  };
};
export const signupPostCredentials = (credentials, resetForm, modalHandler) => {
  return dispatch => {
    dispatch(authenticationStart());
    axios
      .post("/authentication/signup", credentials)
      .then(res => {
        dispatch(signupPostCredentialsSuccess(res.data));
        modalHandler(
          "The registration was successful! Go back to the sign in page and just sign in!"
        );
      })
      .catch(error => {
        const errorType =
          error.response !== undefined || null
            ? error.response.data.message
            : error;
        let errorData = null;
        switch (errorType) {
          case "Request failed. Request did not have all the values necessary for this endpoint!":
            errorData = {
              type: "formError",
              message: "Missing credentials",
              statusCode: 401
            };
            modalHandler("Please fill in all the details");
            break;
          case "The user account already exists":
            errorData = {
              type: "formError",
              message: "The user account already exists",
              statusCode: 401
            };
            modalHandler(
              "The user account already exists! Use a different email id."
            );
            break;
          default:
            errorData = { type: "serverError", error };
            modalHandler("Something went wrong. Try again later!");
            break;
        }
        dispatch(signupPostCredentialsFailed(errorData));
      });
  };
};

export const signupPostCredentialsSuccess = postSuccessData => {
  return {
    type: actionTypes.SIGNUP_POST_CREDENTIALS_SUCCESS,
    postSuccessData: postSuccessData
  };
};
export const signupPostCredentialsFailed = error => {
  return {
    type: actionTypes.SIGNUP_POST_CREDENTIALS_FAILED,
    error: error
  };
};

export const signinPostCredentials = (credentials, resetForm, modalHandler) => {
  return dispatch => {
    dispatch(authenticationStart());
    axios
      .post("/authentication/signin", credentials)
      .then(res => {
        const expTimeToMilliseconds = res.data.expirationTime * 1000;
        const expirationDate = new Date(
          new Date().getTime() + expTimeToMilliseconds
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(signinPostCredentialsSuccess(res.data.token));
        dispatch(logoutActions.clearLogoutMessage());
        dispatch(logoutActions.automaticLogout());
      })
      .catch(error => {
        const errorType =
          error.response !== undefined || null
            ? error.response.data.message
            : error;
        let errorData = null;
        switch (errorType) {
          case "Request failed. Request did not have all the values necessary for this endpoint!":
            errorData = {
              type: "formError",
              message: "Missing credentials",
              statusCode: 401
            };
            modalHandler("Please fill in all the details");
            break;
          case "This user does not have an account and should register!":
            errorData = {
              type: "formError",
              message: "This user does not have an account!",
              statusCode: 401
            };
            modalHandler(
              "The account for this email id doesnt exist. Please sign up!"
            );
            break;
          case "The entered password is invalid!":
            errorData = {
              type: "formError",
              message: "The entered password is invalid!",
              statusCode: 401
            };
            modalHandler("The entered password is invalid!");
            break;
          default:
            errorData = { type: "serverError", error };
            modalHandler("Something went wrong. Try again later!");
            break;
        }
        dispatch(signinPostCredentialsFailed(errorData));
      });
  };
};

export const signinPostCredentialsSuccess = token => {
  return {
    type: actionTypes.SIGNIN_POST_CREDENTIALS_SUCCESS,
    token
  };
};
export const signinPostCredentialsFailed = error => {
  return {
    type: actionTypes.SIGNIN_POST_CREDENTIALS_FAILED,
    error: error
  };
};
