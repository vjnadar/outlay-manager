import axios from "../../../../http/axios";
import { default as axios_main } from "axios";
import * as logoutActions from "../../authenticationActions/index";
import * as actionTypes from "../actionTypes/actionTypes";

const getMainPageDataStart = () => {
  return {
    type: actionTypes.GET_MAIN_PAGE_DATA_START
  };
};
export const getAll = date => {
  return dispatch => {
    dispatch(getMainPageDataStart());
    axios_main
      .all([
        axios.get("/main/getDateData/" + date.toISOString()),
        axios.get("/main/getTotal/")
      ])
      .then(
        axios_main.spread((getDateDataRes, getTotalRes) => {
          dispatch(
            getMainPageDataSuccess(
              date,
              getDateDataRes.data.entryFromDate,
              getTotalRes.data.result
            )
          );
        })
      )
      .catch(error => {
        if (error.response.data.message === "jwt expired") {
          dispatch(
            logoutActions.syncLogout("Sorry. Your token expired! Log in again.")
          );
        } else {
          dispatch(getMainPageDataFailed(date, error.response.data));
        }
      });
  };
};

const getMainPageDataSuccess = (date, selectedDateEntry, grandTotal) => {
  return {
    type: actionTypes.GET_MAIN_PAGE_DATA_SUCCESS,
    payload: { lastSelectedDate: date, selectedDateEntry, grandTotal }
  };
};

const getMainPageDataFailed = (date, error) => {
  return {
    type: actionTypes.GET_MAIN_PAGE_DATA_FAILED,
    date: date,
    error: error
  };
};
