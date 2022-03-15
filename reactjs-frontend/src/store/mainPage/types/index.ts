import { FormikState } from "formik";
import { Moment } from "moment";

import { CommonTypeProperties, ErrorData } from "../../../generalTypes";
import { FlowType } from "../../../views/MainPage/types";

export type GrandTotalObj = {
    _id: FlowType;
    totalAmount: number;
};
export type GrandTotal = {
    result: GrandTotalObj[];
};
export type Income = {
    _id: string;
    user_id: string;
    flowtype: "income";
    type: string;
    amount: number;
    date: string;
    time: string;
};
export type Expense = {
    _id: string;
    user_id: string;
    flowtype: "expense";
    type: string;
    amount: number;
    date: string;
    time: string;
};
export type Entry = {
    _id: string;
    flowtype: FlowType;
    type: string;
    amount: string;
    dateTime: Moment;
};
export type SelectedDateEntry = {
    _id: string;
    income: Income[] | [];
    expense: Expense[] | [];
};
export type SuccessData = {
    message: string;
    _id?: string;
};
export type MainPageState = {
    selectedDateEntry: SelectedDateEntry | null;
    lastSelectedDate: string;
    loading: boolean;
    successData: SuccessData | null;
    error: ErrorData | null;
    grandTotal: GrandTotalObj[];
};
export type GetAllObj = {
    date: Moment;
};
export type OutlayFormValues = {
    flowtype: FlowType;
    itype: string;
    etype: string;
    iCustom: string;
    eCustom: string;
    amount: string;
};
export type PostMainPageDataObj = {
    entries: Entry;
    modalHandler: () => void;
    resetForm: (nextState?: Partial<FormikState<OutlayFormValues>>) => void;
};
export type DeleteDateEntryObj = {
    id: string;
    date: Moment;
    closeModalCallback: () => void;
};
export type GetDateDataResponse = SuccessData & {
    entryFromDate: SelectedDateEntry;
};
export type GetTotalResponse = SuccessData & GrandTotal;
export type UpdateDateEntryObj = {
    newEntry: Entry;
    modalHandler: () => void;
};
