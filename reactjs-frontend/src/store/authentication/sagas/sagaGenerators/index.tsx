import { AxiosResponse } from "axios";
import { put } from "redux-saga/effects";

import axios from "../../../../httpClient";
import { clearAll } from "../../../general/redux";
import {
    authenticationStart,
    automaticLogoutSagaActionCreator,
    clearLogoutMessage,
    logout,
    logoutMessage,
    logoutSagaActionCreator,
    resetPasswordFailed,
    resetPasswordSuccessful,
    setAutomaticLogoutTimerSagaActionCreator,
    signinFailed,
    signinSuccessful,
    signupFailed,
    signupSuccessful
} from "../../redux";
import {
    ResetPasswordRequestSubmitObj,
    ResetPasswordSubmitObj,
    SetAutomaticTimerObj,
    SigninSubmitObj,
    SigninSuccessData,
    SignupSubmitObj,
    SuccessData,
    SyncLogoutObj
} from "../../types";

export function* signInSaga({ payload }: { type: string; payload: SigninSubmitObj }) {
    try {
        yield put(authenticationStart());
        const res: AxiosResponse<SigninSuccessData> = yield axios.post("/authentication/signin", payload.credentials);
        const expTimeToMilliseconds = res.data.expirationTime * 1000;
        const expirationDate = new Date(new Date().getTime() + expTimeToMilliseconds);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expirationDate", expirationDate.toISOString());
        yield put(signinSuccessful(res.data.token));
        yield put(clearLogoutMessage());
        yield put(automaticLogoutSagaActionCreator());
    } catch (error) {
        /* @ts-ignore: Error has type any. */
        const errorType = error.response.data.message ?? error;
        let errorData = null;
        switch (errorType) {
            case "Request failed. Request did not have all the values necessary for this endpoint!":
                errorData = {
                    type: "formError",
                    message: "Missing credentials",
                    statusCode: 401
                };
                break;
            case "This user does not have an account and should register!":
                errorData = {
                    type: "formError",
                    message: "This user does not have an account!",
                    statusCode: 401
                };
                break;
            case "The entered password is invalid!":
                errorData = {
                    type: "formError",
                    message: "The entered password is invalid!",
                    statusCode: 401
                };
                break;
            default:
                errorData = { type: "serverError", error };
                break;
        }
        yield put(signinFailed(errorData));
    }
}
export function* signup({ payload }: { type: string; payload: SignupSubmitObj }) {
    try {
        yield put(authenticationStart());
        const result: AxiosResponse<SuccessData> = yield axios.post("/authentication/signup", payload.credentials);
        yield put(signupSuccessful(result.data));
    } catch (error) {
        /* @ts-ignore: Error has type any. */
        const errorType = error.response.data.message ?? error;
        let errorData = null;
        switch (errorType) {
            case "Request failed. Request did not have all the values necessary for this endpoint!":
                errorData = {
                    type: "formError",
                    message: "Missing credentials",
                    statusCode: 401
                };
                break;
            case "The user account already exists":
                errorData = {
                    type: "formError",
                    message: "The user account already exists",
                    statusCode: 401
                };
                break;
            default:
                errorData = { type: "serverError", error };
                break;
        }
        yield put(signupFailed(errorData));
    }
}
export function* resetPasswordRequest({ payload }: { type: string; payload: ResetPasswordRequestSubmitObj }) {
    try {
        yield put(authenticationStart());
        const result: AxiosResponse<SuccessData> = yield axios.put("/authentication/resetPasswordRequest", payload.resetPasswordRequestSubmitObj);
        yield put(resetPasswordSuccessful(result.data));
    } catch (error) {
        /* @ts-ignore: Error has type any. */
        const errorType = error.response.data.message ?? error;
        let errorData = null;
        switch (errorType) {
            case "This user does not have an account and should register!":
                errorData = {
                    type: "formError",
                    message: "Not a registered user account",
                    statusCode: 401
                };
                break;
            case "A mail was already sent! Please check your email account!":
                errorData = {
                    type: "formError",
                    message: "A mail was already sent.",
                    statusCode: 401
                };
                break;
            case "The email value was not present.":
                errorData = {
                    type: "formError",
                    message: "The request did not have all the values.",
                    statusCode: 400
                };
                break;
            default:
                errorData = { type: "serverError", error };
                break;
        }
        yield put(resetPasswordFailed(errorData));
    }
}
export function* resetPassword({ payload }: { type: string; payload: ResetPasswordSubmitObj }) {
    try {
        yield put(authenticationStart());
        const result: AxiosResponse<SuccessData> = yield axios.put("/authentication/resetPassword", payload.newPasswordObj);
        yield put(resetPasswordSuccessful(result.data));
    } catch (error) {
        /* @ts-ignore: Error has type any. */
        const errorType = error.response.data.message ?? error;
        let errorData = null;
        switch (errorType) {
            case "The token expired!":
                errorData = {
                    type: "formError",
                    message: "The token expired!",
                    statusCode: 401
                };
                break;
            case "The token is invalid!":
                errorData = {
                    type: "formError",
                    message: "The token is invalid!",
                    statusCode: 401
                };
                break;
            case "This user does not have an account and should register!":
                errorData = {
                    type: "formError",
                    message: "Not a registered user account",
                    statusCode: 401
                };
                break;
            case "Request failed. Request did not have all the values necessary for this endpoint!":
                errorData = {
                    type: "formError",
                    message: "The request did not have all the values.",
                    statusCode: 400
                };
                break;
            default:
                errorData = { type: "serverError", error };
                break;
        }
        yield put(resetPasswordFailed(errorData));
    }
}

let timer: number;
export function* setAutomaticTimer({ payload }: { type: string; payload: SetAutomaticTimerObj }) {
    yield new Promise<void>((resolve) => {
        timer = window.setTimeout(() => {
            resolve();
        }, payload.time);
    });
    yield put(logoutSagaActionCreator({ message: "Sorry. Your token expired! Log in again." }));
}
export function* syncLogout({ payload }: { type: string; payload: SyncLogoutObj }) {
    yield put(authenticationStart());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    yield put(clearAll());
    if (payload?.message) yield put(logoutMessage(payload.message));
    clearTimeout(timer);
    yield put(logout());
}
export function* automaticLogout() {
    const dateFromLocalStorage = localStorage.getItem("expirationDate") ?? "";
    const expirationDate = new Date(dateFromLocalStorage);
    const token = localStorage.getItem("token");
    if (!token) {
        yield put(logoutSagaActionCreator());
    } else if (expirationDate <= new Date()) {
        yield put(logoutSagaActionCreator());
    } else {
        yield put(signinSuccessful(token));
        const reducedTime = expirationDate.getTime() - new Date().getTime();
        yield put(setAutomaticLogoutTimerSagaActionCreator({ time: reducedTime }));
    }
}
