import { AxiosResponse } from "axios";
import { put } from "redux-saga/effects";

import axios from "../../../../http";
import { SignInSubmitObj } from "../../../../views/SignIn/types";
import {
    authenticationStart,
    automaticLogoutSagaActionCreator,
    clearLogoutMessage,
    // logout,
    // logoutMessage,
    // resetPasswordFailed,
    // resetPasswordSuccessful,
    signInFailed,
    signInSuccessful
    // signUpFailed,
    // signUpSuccessful
} from "../../redux";
import { SignInSuccessData } from "../../types";

export function* signInSaga({ payload }: { type: string; payload: SignInSubmitObj }) {
    try {
        yield put(authenticationStart());
        const res: AxiosResponse<SignInSuccessData> = yield axios.post("/authentication/signin", payload.credentials);
        const expTimeToMilliseconds = res.data.expirationTime * 1000;
        const expirationDate = new Date(new Date().getTime() + expTimeToMilliseconds);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expirationDate", expirationDate.toISOString());
        yield put(signInSuccessful(res.data.token));
        yield put(clearLogoutMessage());
        yield put(automaticLogoutSagaActionCreator());
    } catch (error) {
        /* @ts-ignore: Error has type any. */
        const errorType = error.response !== undefined || null ? error.response.data.message : error;
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
        yield put(signInFailed(errorData));
    }
}
