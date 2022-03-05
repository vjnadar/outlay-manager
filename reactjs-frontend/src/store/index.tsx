import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { AuthenticationSagaNames } from "./authentication/enums";
import authenticationReducer from "./authentication/redux";
import watchAuthentication from "./authentication/sagas";

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
    reducer: { authenticationReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [AuthenticationSagaNames.SignInSaga]
            }
        }).concat(sagaMiddleware)
});

function* rootSaga() {
    yield all([fork(watchAuthentication)]);
}
sagaMiddleware.run(rootSaga);
