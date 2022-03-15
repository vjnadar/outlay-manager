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
                payload.modalHandler("Please fill in all the details");
                break;
            case "This user does not have an account and should register!":
                errorData = {
                    type: "formError",
                    message: "This user does not have an account!",
                    statusCode: 401
                };
                payload.modalHandler("The account for this email id doesnt exist. Please sign up!");
                break;
            case "The entered password is invalid!":
                errorData = {
                    type: "formError",
                    message: "The entered password is invalid!",
                    statusCode: 401
                };
                payload.modalHandler("The entered password is invalid!");
                break;
            default:
                errorData = { type: "serverError", error };
                payload.modalHandler("Something went wrong. Try again later!");
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
        payload.modalHandler("The registration was successful! Go back to the sign in page and just sign in!");
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
                payload.modalHandler("Please fill in all the details");
                break;
            case "The user account already exists":
                errorData = {
                    type: "formError",
                    message: "The user account already exists",
                    statusCode: 401
                };
                payload.modalHandler("The user account already exists! Use a different email id.");
                break;
            default:
                errorData = { type: "serverError", error };
                payload.modalHandler("Something went wrong. Try again later!");
                break;
        }
        yield put(signupFailed(errorData));
    }
}
export function* resetPasswordRequest({ payload }: { type: string; payload: ResetPasswordRequestSubmitObj }) {
    try {
        yield put(authenticationStart());
        const result: AxiosResponse<SuccessData> = yield axios.put("/authentication/resetPasswordRequest", payload.resetPasswordRequestSubmitObj);
        payload.modalHandler("We sent a mail to your registered email account. Please check your mail.");
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
                payload.modalHandler("This user does not have an account and should register!");
                break;
            case "A mail was already sent! Please check your email account!":
                errorData = {
                    type: "formError",
                    message: "A mail was already sent.",
                    statusCode: 401
                };
                payload.modalHandler("A mail was already sent! Please check your email account!");
                break;
            case "The email value was not present.":
                errorData = {
                    type: "formError",
                    message: "The request did not have all the values.",
                    statusCode: 400
                };
                payload.modalHandler("Enter your email!");
                break;
            default:
                errorData = { type: "serverError", error };
                payload.modalHandler("Something went wrong. Try again later!");
                break;
        }
        yield put(resetPasswordFailed(errorData));
    }
}
export function* resetPassword({ payload }: { type: string; payload: ResetPasswordSubmitObj }) {
    try {
        yield put(authenticationStart());
        const result: AxiosResponse<SuccessData> = yield axios.put("/authentication/resetPassword", payload.newPasswordObj);
        payload.setResetSuccess(true);
        payload.modalHandler("Your password was changed successfully. Login with your new password.");
        yield put(resetPasswordSuccessful(result.data));
    } catch (error) {
        /* @ts-ignore: Error has type any. */
        const errorType = error.response.data.message ?? error;
        let errorData = null;
        switch (errorType) {
            case "The token expired!":
                payload.setResetSuccess(true);
                errorData = {
                    type: "formError",
                    message: "The token expired!",
                    statusCode: 401
                };
                payload.modalHandler("The token expired! Please try again.");
                break;
            case "The token is invalid!":
                payload.setResetSuccess(true);
                errorData = {
                    type: "formError",
                    message: "The token expired!",
                    statusCode: 401
                };
                payload.modalHandler("The token is invalid! Try again.");
                break;
            case "This user does not have an account and should register!":
                errorData = {
                    type: "formError",
                    message: "Not a registered user account",
                    statusCode: 401
                };
                payload.modalHandler("This user does not have an account and should register!");
                break;
            case "Request failed. Request did not have all the values necessary for this endpoint!":
                errorData = {
                    type: "formError",
                    message: "The request did not have all the values.",
                    statusCode: 400
                };
                payload.modalHandler("Request did not have all the values necessary for this endpoint!");
                break;
            default:
                errorData = { type: "serverError", error };
                payload.modalHandler("Something went wrong. Try again later!");
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
        yield put(logoutSagaActionCreator);
    } else if (expirationDate <= new Date()) {
        yield put(logoutSagaActionCreator);
    } else {
        yield put(signinSuccessful(token));
        const reducedTime = expirationDate.getTime() - new Date().getTime();
        yield put(setAutomaticLogoutTimerSagaActionCreator({ time: reducedTime }));
    }
}
