import { createAction, createSlice } from "@reduxjs/toolkit";

import { clearAll } from "../../general/redux";
import { StatsPageSagaName } from "../enums";
import { FetchStatsObj, StatsData, StatsPageState } from "../types";

const initialState: StatsPageState = {
    income: [],
    expense: [],
    loading: false,
    incomeLabel: "",
    successData: "",
    expenseLabel: "",
    lastStartDate: "",
    lastEndDate: "",
    error: null
};
function createStatsSlice() {
    return createSlice({
        name: "stats",
        initialState,
        reducers: {
            fetchStatsStarts: (state) => {
                const currentState = state;
                currentState.loading = true;
            },
            fetchStatsSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                /* eslint-disable-next-line no-underscore-dangle */
                const income = action.payload.statsData.result.filter((val: StatsData) => val._id.flowtype === "income");
                /* eslint-disable-next-line no-underscore-dangle */
                const expense = action.payload.statsData.result.filter((val: StatsData) => val?._id?.flowtype === "expense");
                currentState.income = income;
                currentState.expense = expense;
                currentState.successData = action.payload.statsData.message;
            },
            fetchStatsFailed: (state, action) => {
                const currentState = state;
                currentState.error = action.payload;
                currentState.successData = "";
            },
            setDateEntries: (state, action) => {
                const currentState = state;
                currentState.incomeLabel = action.payload.incomeDateLabel;
                currentState.expenseLabel = action.payload.expenseDateLabel;
                currentState.lastStartDate = action.payload.startDate;
                currentState.lastEndDate = action.payload.endDate;
            },
            clearSuccessDataAndErrorData: (state) => {
                const currentState = state;
                currentState.successData = "";
                currentState.error = null;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(clearAll, (state) => {
                const currentState = state;
                currentState.income = [];
                currentState.expense = [];
                currentState.loading = false;
                currentState.incomeLabel = "";
                currentState.expenseLabel = "";
                currentState.lastStartDate = "";
                currentState.lastEndDate = "";
                currentState.error = null;
            });
        }
    });
}
const { actions, reducer } = createStatsSlice();
export const { fetchStatsStarts, fetchStatsSuccessful, fetchStatsFailed, setDateEntries, clearSuccessDataAndErrorData } = actions;
export const fetchStatsSagaActionCreator = createAction<FetchStatsObj>(StatsPageSagaName.FetchStats);
export default reducer;
