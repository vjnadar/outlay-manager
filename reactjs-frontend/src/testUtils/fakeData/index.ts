import { SigninSuccessData } from "../../store/authentication/types";
import { GetDateDataResponse, GetTotalResponse } from "../../store/mainPage/types";

export const signinSuccessData: SigninSuccessData = {
    token: "abcd",
    user_id: "outlay-007",
    expirationTime: 3601,
    message: "Login was sucessful!"
};
export const getDateEntry: GetDateDataResponse = {
    entryFromDate: { _id: "989642", income: [], expense: [] },
    message: "The data was fetched successfully"
};
export const getTotal: GetTotalResponse = {
    message: "Fetched the total successfully!",
    result: [
        {
            _id: "income",
            totalAmount: 10000
        },
        {
            _id: "expense",
            totalAmount: 0
        }
    ]
};
