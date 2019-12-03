import * as actionTypes from "../actionTypes/actionTypes";
import * as actions from "../index";
import * as generalActions from "../../general/index";

let timer;
const setAutomaticLogoutTimer = time => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(syncLogout("Sorry. Your token expired! Log in again."));
    }, time);
  };
};

const logout = () => {
  return {
    type: actionTypes.SYNC_LOGOUT
  };
};

export const syncLogout = message => {
  return dispatch => {
    dispatch(actions.authenticationStart());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    dispatch(generalActions.clearAll());
    dispatch(logoutMessage(message));
    clearTimeout(timer);
    dispatch(logout());
  };
};

export const logoutMessage = message => {
  return {
    type: actionTypes.LOGOUT_MESSAGE,
    message
  };
};

export const clearLogoutMessage = () => {
  return {
    type: actionTypes.CLEAR_LOGOUT_MESSAGE
  };
};

export const automaticLogout = () => {
  return dispatch => {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(syncLogout());
    } else if (expirationDate <= new Date()) {
      dispatch(syncLogout());
    } else {
      dispatch(actions.signinPostCredentialsSuccess(token));
      const reducedTime = expirationDate.getTime() - new Date().getTime();
      dispatch(setAutomaticLogoutTimer(reducedTime));
    }
  };
};
