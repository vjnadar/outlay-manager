import { AxiosResponse } from "axios";
import { put } from "redux-saga/effects";

import axios from "../../../../httpClient";
import { logoutSagaActionCreator } from "../../../authentication/redux";
import { fetchStatsFailed, fetchStatsStarts, fetchStatsSuccessful } from "../../redux";
import { FetchStatsObj, FetchStatsResponse } from "../../types";

export function* fetchStats({ payload }: { type: string; payload: FetchStatsObj }) {
    try {
        yield put(fetchStatsStarts());
        const response: AxiosResponse<FetchStatsResponse> = yield axios.put("/stats/getStats", payload.dateRange);
        yield put(fetchStatsSuccessful({ statsData: response.data.result, callBack: payload.setSingleFlowtype }));
    } catch (error) {
        /*  @ts-ignore: Error has type any. */
        const currentError = error?.response?.data ?? error;
        if (currentError.message === "jwt expired") {
            yield put(logoutSagaActionCreator({ message: "Sorry. Your token expired! Log in again." }));
        } else {
            /*  @ts-ignore: Error has type any. */
            yield put(fetchStatsFailed(error.response.data));
        }
    }
}
