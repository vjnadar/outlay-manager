import * as actionTypes from "../../actions/mainPageActions/actionTypes/actionTypes";
import * as generalActionTypes from "../../actions/general/actionTypes/actionTypes";
const initialState = {
  selectedDateEntry: null,
  lastSelectedDate: "",
  loading: false,
  successData: null,
  error: null,
  grandTotal: []
};
export const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MAIN_PAGE_DATA_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.GET_MAIN_PAGE_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedDateEntry: action.payload.selectedDateEntry,
        lastSelectedDate: action.payload.lastSelectedDate,
        grandTotal: action.payload.grandTotal.concat()
      };
    }
    case actionTypes.GET_MAIN_PAGE_DATA_FAILED: {
      return {
        ...state,
        loading: false,
        lastSelectedDate: action.date,
        error: action.error
      };
    }

    case actionTypes.POST_DATE_DATA_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.POST_DATE_DATA_SUCCESS: {
      return {
        ...state,
        successData: action.postSuccessData
      };
    }
    case actionTypes.POST_DATE_DATA_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case actionTypes.DELETE_DATE_ENTRY_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.DELETE_DATE_ENTRY_SUCCESS: {
      return {
        ...state,
        successData: action.deleteSuccessData
      };
    }
    case actionTypes.DELETE_DATE_ENTRY_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case generalActionTypes.GENERAL_CLEAR_ALL: {
      return {
        ...state,
        selectedDateEntry: null,
        lastSelectedDate: "",
        loading: false,
        successData: null,
        error: null,
        grandTotal: []
      };
    }
    default: {
      return state;
    }
  }
};
