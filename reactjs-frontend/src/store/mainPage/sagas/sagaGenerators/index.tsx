import axiosMain, { AxiosResponse } from "axios";
import { put } from "redux-saga/effects";

import axios from "../../../../httpClient";
import { logoutSagaActionCreator } from "../../../authentication/redux";
import {
    deleteDateEntryFailed,
    deleteDateEntryStarts,
    deleteDateEntrySuccessful,
    getMainPageDataFailed,
    getMainPageDataSagaActionCreator,
    getMainPageDataStarts,
    getMainPageDataSuccessful,
    postMainPageDataFailed,
    postMainPageDataStarts,
    postMainPageDataSuccessful,
    updateDateEntryFailed,
    updateDateEntryStarts,
    updateDateEntrySuccessful
} from "../../redux";
import { DeleteDateEntryObj, GetAllObj, GetDateDataResponse, GetTotalResponse, PostMainPageDataObj, SuccessData, UpdateDateEntryObj } from "../../types";

export function* getMainPageData({ payload }: { type: string; payload: GetAllObj }) {
    try {
        yield put(getMainPageDataStarts());
        const [getDateDataResponse, getTotalResponse]: [AxiosResponse<GetDateDataResponse>, AxiosResponse<GetTotalResponse>] = yield axiosMain.all([
            axios.get(`/main/getDateData/${payload.date.toISOString()}`),
            axios.get("/main/getTotal/")
        ]);
        yield put(
            getMainPageDataSuccessful({
                lastSelectedDate: payload.date,
                selectedDateEntry: getDateDataResponse.data.entryFromDate,
                grandTotal: getTotalResponse.data.result
            })
        );
    } catch (error) {
        /*  @ts-ignore: Error has type any. */
        const currentError = error.response.data ?? error;
        if (currentError.message === "jwt expired") {
            yield put(logoutSagaActionCreator({ message: "Sorry. Your token expired! Log in again." }));
        } else {
            yield put(getMainPageDataFailed({ lastSelectedDate: payload.date, error: currentError }));
        }
    }
}
export function* postMainPageData({ payload }: { type: string; payload: PostMainPageDataObj }) {
    try {
        yield put(postMainPageDataStarts());
        const response: AxiosResponse<SuccessData> = yield axios.post("/main/postDateData", payload.entries);
        yield put(postMainPageDataSuccessful(response.data));
        payload.resetForm();
        yield put(getMainPageDataSagaActionCreator({ date: payload.entries.dateTime }));
        payload.modalHandler();
    } catch (error) {
        /* @ts-ignore:Error has type any */
        if (error.response.data.message === "jwt expired") {
            yield put(logoutSagaActionCreator({ message: "Sorry. Your token expired! Log in again." }));
        } else {
            /* @ts-ignore:Error has type any */
            yield put(postMainPageDataFailed(error.response.data));
        }
    }
}
export function* deleteDateEntry({ payload }: { type: string; payload: DeleteDateEntryObj }) {
    try {
        yield put(deleteDateEntryStarts());
        const { id } = payload;
        const response: AxiosResponse<SuccessData> = yield axios.delete(`/main/deleteEntry/${id}`);
        yield put(deleteDateEntrySuccessful(response.data));
        yield put(getMainPageDataSagaActionCreator({ date: payload.date }));
        payload.closeModalCallback();
    } catch (error) {
        /* @ts-ignore:Error has type any */
        if (error.response.data.message === "jwt expired") {
            yield put(logoutSagaActionCreator({ message: "Sorry .Your token expired! Log in again." }));
        } else {
            /* @ts-ignore:Error has type any */
            yield put(deleteDateEntryFailed(error.response.data));
        }
    }
}
export function* updateDateEntry({ payload }: { type: string; payload: UpdateDateEntryObj }) {
    try {
        yield put(updateDateEntryStarts());
        const body = {
            newEntry: payload.newEntry
        };
        const response: AxiosResponse<SuccessData> = yield axios.put("/main/updateEntry", body);
        yield put(updateDateEntrySuccessful(response.data));
        yield put(getMainPageDataSagaActionCreator({ date: payload.newEntry.dateTime }));
        payload.modalHandler();
    } catch (error) {
        /* @ts-ignore:Error has type any */
        if (error.response.data.message === "jwt expired") {
            yield put(logoutSagaActionCreator({ message: "Sorry. Your token expired! Log in again." }));
        } else {
            /* @ts-ignore:Error has type any */
            yield put(updateDateEntryFailed(error.response.data));
        }
    }
}
