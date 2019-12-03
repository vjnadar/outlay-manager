import axios from "../../../../http/axios";
import * as actionTypes from "../actionTypes/actionTypes";
import * as logoutActions from "../../authenticationActions/index";

export const getStatsStart = () => {
  return {
    type: actionTypes.GET_STATS_START
  };
};

export const getStats = (body, singleFlowtypeCallback) => {
  return dispatch => {
    dispatch(getStatsStart());
    axios
      .put("/stats/getStats", body)
      .then(res => {
        dispatch(getStatsSuccess(res.data.result, singleFlowtypeCallback));
      })
      .catch(error => {
        if (error.response.data.message === "jwt expired") {
          dispatch(
            logoutActions.syncLogout("Sorry. Your token expired! Log in again.")
          );
        } else {
          dispatch(getStatsFailed(error.response.data));
        }
      });
  };
};

export const getStatsSuccess = (statsData, callBack) => {
  const income = statsData.filter(val => val._id.flowtype === "income");
  const expense = statsData.filter(val => val._id.flowtype === "expense");
  callBack(income, expense);
  const payload = {
    income,
    expense
  };

  return {
    type: actionTypes.GET_STATS_SUCCESS,
    payload
  };
};

export const getStatsFailed = error => {
  return {
    type: actionTypes.GET_STATS_FAILED,
    error: error
  };
};
