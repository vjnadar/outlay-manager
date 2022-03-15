import { all, takeLatest } from "redux-saga/effects";

import { AuthenticationSagaNames } from "../enums";
import { automaticLogout, resetPassword, resetPasswordRequest, setAutomaticTimer, signInSaga, signup, syncLogout } from "./sagaGenerators";

export default function* watchAuthentication() {
    yield all([
        takeLatest(AuthenticationSagaNames.SignInSaga, signInSaga),
        takeLatest(AuthenticationSagaNames.SignUpSaga, signup),
        takeLatest(AuthenticationSagaNames.ResetPasswordRequestSaga, resetPasswordRequest),
        takeLatest(AuthenticationSagaNames.ResetPasswordSaga, resetPassword),
        takeLatest(AuthenticationSagaNames.AutomaticLogoutSaga, automaticLogout),
        takeLatest(AuthenticationSagaNames.SetAutomaticLogoutTimerSaga, setAutomaticTimer),
        takeLatest(AuthenticationSagaNames.SyncLogoutSaga, syncLogout)
    ]);
}
