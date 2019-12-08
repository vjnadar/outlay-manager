import * as actionTypes from "../../actions/authenticationActions/actionTypes/actionTypes";

const initialState = {
  loading: false,
  successData: null,
  error: null,
  token: "",
  message: ""
};
export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.SIGNIN_POST_CREDENTIALS_SUCCESS: {
      return {
        ...state,
        token: action.token,
        loading: false,
        error: null
      };
    }
    case actionTypes.SIGNIN_POST_CREDENTIALS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case actionTypes.SIGNUP_POST_CREDENTIALS_SUCCESS: {
      return {
        ...state,
        successData: action.postSuccessData,
        loading: false,
        error: null
      };
    }
    case actionTypes.SIGNUP_POST_CREDENTIALS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case actionTypes.LOGOUT_MESSAGE: {
      return {
        ...state,
        message: action.message
      };
    }
    case actionTypes.CLEAR_LOGOUT_MESSAGE: {
      return {
        ...state,
        message: ""
      };
    }
    case actionTypes.SYNC_LOGOUT: {
      return {
        ...state,
        loading: false,
        error: null,
        token: "",
        successData: null
      };
    }
    case actionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        successData: action.successData,
        loading: false,
        error: null
      };
    }
    case actionTypes.RESET_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
};
