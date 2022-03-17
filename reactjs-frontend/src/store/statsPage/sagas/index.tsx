import { all, takeLatest } from "redux-saga/effects";

import { StatsPageSagaName } from "../enums";
import { fetchStats } from "./sagaGenerators";

export default function* watchStatsPage() {
    yield all([takeLatest(StatsPageSagaName.FetchStats, fetchStats)]);
}
