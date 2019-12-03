import * as actionTypes from "../../actions/statsPageActions/actionTypes/actionTypes";
import * as generalActionTypes from "../../actions/general/actionTypes/actionTypes";
const initialState = {
  income: [],
  expense: [],
  loading: false,
  statsData: null,
  incomeLabel: "",
  expenseLabel: "",
  lastStartDate: null,
  lastEndDate: null,
  error: null
};

export const statsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STATS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.GET_STATS_SUCCESS: {
      return {
        ...state,
        loading: false,
        income: action.payload.income.concat(),
        expense: action.payload.expense.concat()
      };
    }
    case actionTypes.GET_STATS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case actionTypes.SET_LAST_DATE_ENTRY: {
      return {
        ...state,
        incomeLabel: action.payload.incomeDateLabel,
        expenseLabel: action.payload.expenseDateLabel,
        lastStartDate: action.payload.startDate,
        lastEndDate: action.payload.endDate
      };
    }
    case generalActionTypes.GENERAL_CLEAR_ALL: {
      return {
        ...state,
        income: [],
        expense: [],
        loading: false,
        statsData: null,
        incomeLabel: "",
        expenseLabel: "",
        lastStartDate: null,
        lastEndDate: null,
        error: null
      };
    }

    default: {
      return state;
    }
  }
};
