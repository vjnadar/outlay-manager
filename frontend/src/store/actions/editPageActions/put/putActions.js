import axios from "../../../../http/axios";
import * as actionTypes from "../actionTypes/actionTypes";
import { getAll } from "../../mainPageActions/get/getActions";
import * as logoutActions from "../../authenticationActions/index";

export const updateDateEntryStart = () => {
  return {
    type: actionTypes.UPDATE_DATE_ENTRY_START
  };
};
export const updateDateEntry = (newEntry, modalHandlerCallback) => {
  return dispatch => {
    dispatch(updateDateEntryStart());
    const body = {
      newEntry
    };
    axios
      .put("/main/updateEntry", body)
      .then(res => {
        dispatch(updateDateEntrySuccess(res.data));
        dispatch(getAll(newEntry.dateTime));
        modalHandlerCallback();
      })
      .catch(error => {
        if (error.response.data.message === "jwt expired") {
          dispatch(
            logoutActions.syncLogout("Sorry. Your token expired! Log in again.")
          );
        } else {
          dispatch(updateDateEntryFailed(error.response.data));
        }
      });
  };
};

export const updateDateEntrySuccess = updateSuccessData => {
  return {
    type: actionTypes.UPDATE_DATE_ENTRY_SUCCESS,
    updateSuccessData
  };
};
export const updateDateEntryFailed = error => {
  return {
    type: actionTypes.UPDATE_DATE_ENTRY_FAILED,
    error: error
  };
};
