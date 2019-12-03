import * as actionTypes from "../actionTypes/actionTypes";

export const setLastDateEntry = dateEntries => {
  return {
    type: actionTypes.SET_LAST_DATE_ENTRY,
    payload: dateEntries
  };
};
