import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { AuthenticationSagaNames } from "./authentication/enums";
import authenticationReducer from "./authentication/redux";
import watchAuthentication from "./authentication/sagas";
import mainPageReducer from "./mainPage/redux";
import watchMainPage from "./mainPage/sagas";

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
    reducer: { authenticationReducer, mainPageReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    AuthenticationSagaNames.SignInSaga,
                    AuthenticationSagaNames.SignUpSaga,
                    AuthenticationSagaNames.ResetPasswordSaga,
                    AuthenticationSagaNames.ResetPasswordRequestSaga
                ]
            }
        }).concat(sagaMiddleware)
});

function* rootSaga() {
    yield all([fork(watchAuthentication), fork(watchMainPage)]);
}
sagaMiddleware.run(rootSaga);
