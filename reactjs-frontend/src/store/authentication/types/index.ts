import { Dispatch, SetStateAction } from "react";

import { Credentials } from "../../../components/FormFactory/types";
import { ErrorData } from "../../../generalTypes";

export interface SuccessData {
    message: string;
}
export interface SigninSuccessData extends SuccessData {
    token: string;
    user_id: string;
    expirationTime: number;
}
export type SigninSubmitObj = {
    credentials: Credentials;
};
export type SignupSubmitObj = {
    credentials: Credentials;
};
export type ResetPasswordRequestObj = {
    email: string;
};
export type ResetPasswordRequestSubmitObj = {
    resetPasswordRequestSubmitObj: ResetPasswordRequestObj;
};
export type NewPasswordValues = {
    password: string;
    token?: string;
};
export type ResetPasswordSubmitObj = {
    newPasswordObj: NewPasswordValues;
};
export type SyncLogoutObj =
    | {
          message?: string;
      }
    | undefined;
export type SetAutomaticTimerObj = {
    time: number;
};

export type AuthenticationState = {
    loading: boolean;
    successData: SuccessData | SigninSuccessData | null;
    error: ErrorData | null;
    token: string;
    message: string;
};
