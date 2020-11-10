import axios from "../../../../http/axios";
import * as actionTypes from "../actionTypes/actionTypes";
import { getAll } from "../get/getActions";
import * as logoutActions from "../../authenticationActions/index";

export const postDateDataStart = () => {
  return {
    type: actionTypes.POST_DATE_DATA_START
  };
};
export const postDateData = (
  entries,
  modalHandlerCallback,
  resetFormCallback
) => {
  return dispatch => {
    dispatch(postDateDataStart());
    axios
      .post("/main/postDateData", entries,{ withCredentials: true })
      .then(res => {
        dispatch(postDateDataSuccess(res.data));
        resetFormCallback();
        dispatch(getAll(entries.dateTime));
        modalHandlerCallback();
      })
      .catch(error => {
        if (error.response.data.message === "jwt expired") {
          dispatch(
            logoutActions.syncLogout("Sorry. Your token expired! Log in again.")
          );
        } else {
          dispatch(postDateDataFailed(error.response.data));
        }
      });
  };
};

export const postDateDataSuccess = postSuccessData => {
  return {
    type: actionTypes.POST_DATE_DATA_SUCCESS,
    postSuccessData: postSuccessData
  };
};
export const postDateDataFailed = error => {
  return {
    type: actionTypes.POST_DATE_DATA_FAILED,
    error: error
  };
};
