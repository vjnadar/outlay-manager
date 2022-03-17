import { ChartTypeRegistry } from "chart.js";
import { Moment } from "moment";
import { ChangeEvent, FormEvent } from "react";
import { FocusedInputShape } from "react-dates";

import { ExpenseData, IncomeData } from "../../../../store/statsPage/types";
import { FlowType } from "../../../../views/MainPage/types";

export type StatsFormProps = {
    getStats: (event: FormEvent<HTMLFormElement>) => void;
    income: IncomeData[] | [];
    expense: ExpenseData[] | [];
    flowtype: FlowType;
    graphtype: keyof ChartTypeRegistry;
    startDate: Moment | null;
    focusedInput: FocusedInputShape | null;
    endDate: Moment | null;
    formHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    dateChangeHandler: (start: Moment | null, end: Moment | null) => void;
    focusChangeHandler: (focused: FocusedInputShape | null) => void;
};
