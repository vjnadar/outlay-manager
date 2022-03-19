import { Moment } from "moment";

import { ErrorData } from "../../../generalTypes";
import { FlowType } from "../../../views/MainPage/types";

export type SuccessData = {
    message: string;
};
export type StatsData = {
    _id: { type: string; flowtype: FlowType };
    amount: number;
};
export type FetchStatsResponse = {
    result: StatsData[];
} & SuccessData;
export type IncomeData = {
    _id: { type: string; flowtype: "income" };
    amount: number;
};
export type ExpenseData = {
    _id: { type: string; flowtype: "expense" };
    amount: number;
};
export type DateRange = { startDate: string; endDate: string };
export type FetchStatsObj = {
    dateRange: DateRange;
};
export type StatsPageState = {
    income: IncomeData[] | [];
    expense: ExpenseData[] | [];
    loading: boolean;
    incomeLabel: string;
    expenseLabel: string;
    lastStartDate: string;
    lastEndDate: string;
    successData: string;
    error: ErrorData | null;
};
export type DateEntries = {
    incomeDateLabel: string;
    expenseDateLabel: string;
    startDate: string;
    endDate: string;
};
