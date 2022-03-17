import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { AuthenticationSagaNames } from "./authentication/enums";
import authenticationReducer from "./authentication/redux";
import watchAuthentication from "./authentication/sagas";
import { MainPageSagaNames } from "./mainPage/enums";
import mainPageReducer from "./mainPage/redux";
import watchMainPage from "./mainPage/sagas";
import { StatsPageSagaName } from "./statsPage/enums";
import statsPageReducer from "./statsPage/redux";
import watchStatsPage from "./statsPage/sagas";

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
    reducer: { authenticationReducer, mainPageReducer, statsPageReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    AuthenticationSagaNames.SignInSaga,
                    AuthenticationSagaNames.SignUpSaga,
                    AuthenticationSagaNames.ResetPasswordSaga,
                    AuthenticationSagaNames.ResetPasswordRequestSaga,
                    MainPageSagaNames.GetMainPageDataSaga,
                    MainPageSagaNames.UpdateDateEntrySaga,
                    StatsPageSagaName.FetchStats,
                    "mainPage/getMainPageDataSuccessful",
                    "stats/fetchStatsSuccessful"
                ]
            }
        }).concat(sagaMiddleware)
});

function* rootSaga() {
    yield all([fork(watchAuthentication), fork(watchMainPage), fork(watchStatsPage)]);
}
sagaMiddleware.run(rootSaga);
