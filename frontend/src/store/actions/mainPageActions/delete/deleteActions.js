import axios from "../../../../http/axios";
import * as actionTypes from "../actionTypes/actionTypes";
import { getAll } from "../get/getActions";
import * as logoutActions from "../../authenticationActions/index";

export const deleteDateEntryStart = () => {
  return {
    type: actionTypes.DELETE_DATE_ENTRY_START
  };
};
export const deleteDateEntry = (id, date, closeModalCallback) => {
  return dispatch => {
    dispatch(deleteDateEntryStart());
    axios
      .delete("/main/deleteEntry/" + id)
      .then(res => {
        dispatch(deleteDateEntrySuccess(res.data));
        dispatch(getAll(date));
        closeModalCallback();
      })
      .catch(error => {
        if (error.response.data.message === "jwt expired") {
          dispatch(
            logoutActions.syncLogout("Sorry .Your token expired! Log in again.")
          );
        } else {
          dispatch(deleteDateEntryFailed(error.response.data));
        }
      });
  };
};

export const deleteDateEntrySuccess = deleteSuccessData => {
  return {
    type: actionTypes.DELETE_DATE_ENTRY_SUCCESS,
    deleteSuccessData: deleteSuccessData
  };
};
export const deleteDateEntryFailed = error => {
  return {
    type: actionTypes.DELETE_DATE_ENTRY_FAILED,
    error: error
  };
};
