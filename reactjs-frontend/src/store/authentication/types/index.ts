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
    modalHandler: (message: string) => void;
};
export type SignupSubmitObj = {
    credentials: Credentials;
    modalHandler: (message: string) => void;
};
export type ResetPasswordRequestObj = {
    email: string;
};
export type ResetPasswordRequestSubmitObj = {
    resetPasswordRequestSubmitObj: ResetPasswordRequestObj;
    modalHandler: (message?: string) => void;
};
export type NewPasswordValues = {
    password: string;
    token?: string;
};
export type ResetPasswordSubmitObj = {
    newPasswordObj: NewPasswordValues;
    modalHandler: (message?: string) => void;
    setResetSuccess: Dispatch<SetStateAction<boolean>>;
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
