import { all, takeLatest } from "redux-saga/effects";

import { MainPageSagaNames } from "../enums";
import { deleteDateEntry, getMainPageData, postMainPageData, updateDateEntry } from "./sagaGenerators";

export default function* watchMainPage() {
    yield all([
        takeLatest(MainPageSagaNames.GetMainPageDataSaga, getMainPageData),
        takeLatest(MainPageSagaNames.PostMainPageDataDaga, postMainPageData),
        takeLatest(MainPageSagaNames.DeleteDateEntrySaga, deleteDateEntry),
        takeLatest(MainPageSagaNames.UpdateDateEntrySaga, updateDateEntry)
    ]);
}
