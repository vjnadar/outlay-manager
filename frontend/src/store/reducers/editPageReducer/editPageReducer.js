import * as actionTypes from "../../actions/editPageActions/actionTypes/actionTypes";
import * as generalActionTypes from "../../actions/general/actionTypes/actionTypes";
const initialState = {
  loading: false,
  successData: null,
  error: null
};
export const editPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DATE_ENTRY_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.UPDATE_DATE_ENTRY_SUCCESS: {
      return {
        ...state,
        successData: action.updateSuccessData
      };
    }
    case actionTypes.UPDATE_DATE_ENTRY_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case generalActionTypes.GENERAL_CLEAR_ALL: {
      return {
        ...state,
        loading: false,
        successData: null,
        error: null
      };
    }
    default: {
      return state;
    }
  }
};
