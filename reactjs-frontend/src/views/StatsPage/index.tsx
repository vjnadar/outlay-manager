import { ChartTypeRegistry } from "chart.js";
import moment, { Moment } from "moment";
import { ChangeEvent, FormEvent, useState } from "react";
import { FocusedInputShape } from "react-dates";
import { useDispatch, useSelector } from "react-redux";

import { Graph, Spinner, StatsForm } from "../../components";
import { fetchStatsSagaActionCreator, setDateEntries } from "../../store/statsPage/redux";
import { ExpenseData, IncomeData } from "../../store/statsPage/types";
import { RootState } from "../../store/types";
import { FlowType } from "../MainPage/types";

function StatsPage(): JSX.Element {
    const dispatch = useDispatch();
    const { lastStartDate, lastEndDate, income, expense, loading, incomeLabel, expenseLabel } = useSelector((state: RootState) => state.statsPageReducer);
    const [startDate, setStartDate] = useState<Moment | null>(lastStartDate ? moment(lastStartDate) : null);
    const [endDate, setEndDate] = useState<Moment | null>(lastEndDate ? moment(lastEndDate) : null);
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
    const [flowtype, setFlowtype] = useState<FlowType>("income");
    const [graphtype, setGraphtype] = useState<keyof ChartTypeRegistry>("pie");
    const [touched, setTouched] = useState<boolean>(false);
    function setSingleFlowtype(incomeData: IncomeData[] | [], expenseData: ExpenseData[] | []) {
        if (!incomeData.length && expenseData.length) {
            setFlowtype("expense");
        } else if (incomeData.length && !expenseData.length) {
            setFlowtype("income");
        }
    }
    function getStats(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const dateRange = {
            startDate: startDate as Moment,
            endDate: endDate as Moment
        };
        const alteredStartDate = moment(startDate).format("DD-MM-YYYY");
        const alteredEndDate = moment(endDate).format("DD-MM-YYYY");
        const incomeDateLabel = `Income (${alteredStartDate}  -  ${alteredEndDate})`;
        const expenseDateLabel = `Expense (${alteredStartDate}  -  ${alteredEndDate})`;
        const dateEntries = {
            incomeDateLabel,
            expenseDateLabel,
            startDate,
            endDate
        };
        dispatch(setDateEntries(dateEntries));
        setTouched(true);
        dispatch(fetchStatsSagaActionCreator({ dateRange, setSingleFlowtype }));
    }
    function formHandler(event: ChangeEvent<HTMLInputElement>) {
        if ((event.target as HTMLInputElement).name === "flowtype") {
            setFlowtype((event.target as HTMLInputElement).value as FlowType);
        } else {
            setGraphtype((event.target as HTMLInputElement).value as keyof ChartTypeRegistry);
        }
    }
    function dateChangeHandler(start: Moment | null, end: Moment | null) {
        setStartDate(start);
        setEndDate(end);
    }
    function focusChangeHandler(focused: FocusedInputShape | null) {
        setFocusedInput(focused);
    }
    let contents = null;
    if (loading) {
        contents = <Spinner />;
    } else {
        contents = (
            <>
                <Graph
                    income={income}
                    expense={expense}
                    flowtype={flowtype}
                    graphtype={graphtype}
                    incomeTitle={incomeLabel}
                    expenseTitle={expenseLabel}
                    touched={touched}
                />

                <StatsForm
                    getStats={(event: FormEvent<HTMLFormElement>) => {
                        getStats(event);
                    }}
                    income={income}
                    graphtype={graphtype}
                    expense={expense}
                    flowtype={flowtype}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                    formHandler={(event: ChangeEvent<HTMLInputElement>) => {
                        formHandler(event);
                    }}
                    dateChangeHandler={(start: Moment | null, end: Moment | null) => {
                        dateChangeHandler(start, end);
                    }}
                    focusChangeHandler={(focused: FocusedInputShape | null) => focusChangeHandler(focused)}
                />
            </>
        );
    }
    /* eslint-disable-next-line react/jsx-no-useless-fragment */
    return <>{contents}</>;
}

export default StatsPage;
