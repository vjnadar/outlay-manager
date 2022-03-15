import { createAction, createSlice } from "@reduxjs/toolkit";

import { clearAll } from "../../general/redux";
import { MainPageSagaNames } from "../enums";
import { DeleteDateEntryObj, GetAllObj, MainPageState, PostMainPageDataObj, UpdateDateEntryObj } from "../types";

const initialState: MainPageState = { selectedDateEntry: null, lastSelectedDate: "", loading: false, successData: null, error: null, grandTotal: [] };

function createMainPageSlice() {
    return createSlice({
        name: "mainPage",
        initialState,
        reducers: {
            getMainPageDataStarts: (state) => {
                const currentState = state;
                currentState.loading = true;
            },
            getMainPageDataSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.selectedDateEntry = action.payload.selectedDateEntry;
                currentState.lastSelectedDate = action.payload.lastSelectedDate;
                currentState.grandTotal = action.payload.grandTotal;
            },
            getMainPageDataFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload.error;
                currentState.lastSelectedDate = action.payload.lastSelectedDate;
            },
            postMainPageDataStarts: (state) => {
                const currentState = state;
                currentState.loading = true;
            },
            postMainPageDataSuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
            },
            postMainPageDataFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload;
            },
            deleteDateEntryStarts: (state) => {
                const currentState = state;
                currentState.loading = true;
            },
            deleteDateEntrySuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
            },
            deleteDateEntryFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.error = action.payload;
            },
            updateDateEntryStarts: (state) => {
                const currentState = state;
                currentState.loading = true;
            },
            updateDateEntrySuccessful: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
            },
            updateDateEntryFailed: (state, action) => {
                const currentState = state;
                currentState.loading = false;
                currentState.successData = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(clearAll, (state) => {
                const currentState = state;
                currentState.selectedDateEntry = null;
                currentState.lastSelectedDate = "";
                currentState.loading = false;
                currentState.successData = null;
                currentState.error = null;
                currentState.grandTotal = [];
            });
        }
    });
}
const { reducer, actions } = createMainPageSlice();
export const {
    getMainPageDataStarts,
    getMainPageDataSuccessful,
    getMainPageDataFailed,
    postMainPageDataStarts,
    postMainPageDataSuccessful,
    postMainPageDataFailed,
    deleteDateEntryStarts,
    deleteDateEntrySuccessful,
    deleteDateEntryFailed,
    updateDateEntryStarts,
    updateDateEntrySuccessful,
    updateDateEntryFailed
} = actions;
export const getMainPageDataSagaActionCreator = createAction<GetAllObj>(MainPageSagaNames.GetMainPageDataSaga);
export const postMainPageDataSagaActionCreator = createAction<PostMainPageDataObj>(MainPageSagaNames.PostMainPageDataDaga);
export const deleteDateEntrySagaActionCreator = createAction<DeleteDateEntryObj>(MainPageSagaNames.DeleteDateEntrySaga);
export const updateDateEntrySagaActionCreator = createAction<UpdateDateEntryObj>(MainPageSagaNames.UpdateDateEntrySaga);
export default reducer;
