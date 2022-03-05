import { all, takeLatest } from "redux-saga/effects";

import { AuthenticationSagaNames } from "../enums";
import { signInSaga } from "./sagaGenerators";

export default function* watchAuthentication() {
    yield all([takeLatest(AuthenticationSagaNames.SignInSaga, signInSaga)]);
}
