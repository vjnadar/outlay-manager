interface SuccessData {
    message: string;
}
export interface SignInSuccessData extends SuccessData {
    token: string;
    user_id: string;
    expirationTime: number;
}
type ErrorData = {
    type: string;
    message: string;
    statusCode: number;
};
export type AuthenticationState = {
    loading: boolean;
    successData: SuccessData | SignInSuccessData | null;
    error: ErrorData | null;
    token: string;
    message: string;
};
