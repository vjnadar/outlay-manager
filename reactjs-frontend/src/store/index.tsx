import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
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

export default function configureStoreWithMiddlewares(initialState = {}): EnhancedStore {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        preloadedState: initialState,
        reducer: { authenticationReducer, mainPageReducer, statsPageReducer },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        AuthenticationSagaNames.SignInSaga,
                        AuthenticationSagaNames.SignUpSaga,
                        AuthenticationSagaNames.ResetPasswordSaga,
                        AuthenticationSagaNames.ResetPasswordRequestSaga,
                        MainPageSagaNames.GetMainPageDataSaga,
                        MainPageSagaNames.PostMainPageDataDaga,
                        MainPageSagaNames.UpdateDateEntrySaga,
                        MainPageSagaNames.DeleteDateEntrySaga,
                        StatsPageSagaName.FetchStats
                    ]
                }
            }).prepend(sagaMiddleware)
    });

    function* rootSaga() {
        yield all([fork(watchAuthentication), fork(watchMainPage), fork(watchStatsPage)]);
    }
    sagaMiddleware.run(rootSaga);
    return store;
}
