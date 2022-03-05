import { Dispatch, SetStateAction } from "react";

export type NewPasswordValues = {
    password: string;
    token?: string;
};
export type ResetPasswordSubmitObj = {
    newPasswordObj: NewPasswordValues;
    modalHandler: (message?: string) => void;
    setResetSuccess: Dispatch<SetStateAction<boolean>>;
};
