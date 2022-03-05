import { Credentials } from "../../../components/FormFactory/types";

export type SignInSubmitObj = {
    credentials: Credentials;
    modalHandler: (message: string) => void;
};
