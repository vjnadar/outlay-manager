import { createAction, createSlice } from "@reduxjs/toolkit";

import { ResetPasswordSubmitObj } from "../../../views/ResetPassword/types";
import { SignInSubmitObj } from "../../../views/SignIn/types";
import { AuthenticationSagaNames } from "../enums";
import { AuthenticationState } from "../types";

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
            signInSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.token = action.payload;
                currentState.error = null;
            },
            signInFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload;
            },
            signUpSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
                currentState.error = null;
            },
            signUpFailed: (state, action) => {
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
        }
    });
}
const { reducer, actions } = createAuthenticationSlice();
export const {
    authenticationStart,
    signInSuccessful,
    signInFailed,
    signUpSuccessful,
    signUpFailed,
    logoutMessage,
    clearLogoutMessage,
    logout,
    resetPasswordSuccessful,
    resetPasswordFailed
} = actions;
export const signInSagaActionCreator = createAction<SignInSubmitObj>(AuthenticationSagaNames.SignInSaga);
export const signUpSagaActionCreator = createAction(AuthenticationSagaNames.SignUpSaga);
export const automaticLogoutSagaActionCreator = createAction(AuthenticationSagaNames.AutomaticLogoutSaga);
export const setAutomaticLogoutTimerSagaActionCreator = createAction(AuthenticationSagaNames.SetAutomaticLogoutTimerSaga);
export const logoutSagaActionCreator = createAction(AuthenticationSagaNames.SyncLogoutSaga);
export const resetPasswordSagaActionCreator = createAction<ResetPasswordSubmitObj>(AuthenticationSagaNames.ResetPasswordSaga);
export const resetPasswordRequestActionCreator = createAction(AuthenticationSagaNames.ResetPasswordRequestSaga);
export default reducer;
