import { createAction, createSlice } from "@reduxjs/toolkit";

import { clearAll } from "../../general/redux";
import { AuthenticationSagaNames } from "../enums";
import {
    AuthenticationState,
    ResetPasswordRequestSubmitObj,
    ResetPasswordSubmitObj,
    SetAutomaticTimerObj,
    SigninSubmitObj,
    SignupSubmitObj,
    SyncLogoutObj
} from "../types";

const initialState: AuthenticationState = {
    loading: false,
    successData: null,
    error: null,
    token: "",
    message: ""
};
function createAuthenticationSlice() {
    return createSlice({
        name: "authentication",
        initialState,
        reducers: {
            authenticationStart: (state) => {
                const currentState = state;
                currentState.loading = true;
            },
            signinSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.token = action.payload;
                currentState.error = null;
            },
            signinFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload;
            },
            signupSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
                currentState.error = null;
            },
            signupFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload;
            },
            logoutMessage: (state, action) => {
                const currentState = state;
                currentState.message = action.payload;
            },
            clearLogoutMessage: (state) => {
                const currentState = state;
                currentState.message = "";
            },
            logout: (state) => {
                const currentState = state;
                currentState.loading = false;
                currentState.token = "";
                currentState.error = null;
                currentState.successData = null;
            },

            resetPasswordSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
                currentState.error = null;
            },
            resetPasswordFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(clearAll, (state) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = null;
                currentState.error = null;
                currentState.token = "";
                currentState.message = "";
            });
        }
    });
}
const { reducer, actions } = createAuthenticationSlice();
export const {
    authenticationStart,
    signinSuccessful,
    signinFailed,
    signupSuccessful,
    signupFailed,
    logoutMessage,
    clearLogoutMessage,
    logout,
    resetPasswordSuccessful,
    resetPasswordFailed
} = actions;
export const signinSagaActionCreator = createAction<SigninSubmitObj>(AuthenticationSagaNames.SignInSaga);
export const signupSagaActionCreator = createAction<SignupSubmitObj>(AuthenticationSagaNames.SignUpSaga);
export const automaticLogoutSagaActionCreator = createAction(AuthenticationSagaNames.AutomaticLogoutSaga);
export const setAutomaticLogoutTimerSagaActionCreator = createAction<SetAutomaticTimerObj>(AuthenticationSagaNames.SetAutomaticLogoutTimerSaga);
export const logoutSagaActionCreator = createAction<SyncLogoutObj>(AuthenticationSagaNames.SyncLogoutSaga);
export const resetPasswordSagaActionCreator = createAction<ResetPasswordSubmitObj>(AuthenticationSagaNames.ResetPasswordSaga);
export const resetPasswordRequestActionCreator = createAction<ResetPasswordRequestSubmitObj>(AuthenticationSagaNames.ResetPasswordRequestSaga);
export default reducer;
