import { ChartTypeRegistry } from "chart.js";

import { ExpenseData, IncomeData } from "../../../../store/statsPage/types";

export type GraphProps = {
    income: IncomeData[] | [];
    expense: ExpenseData[] | [];
    flowtype: string;
    graphtype: keyof ChartTypeRegistry;
    incomeTitle: string;
    expenseTitle: string;
    touched: boolean;
};
