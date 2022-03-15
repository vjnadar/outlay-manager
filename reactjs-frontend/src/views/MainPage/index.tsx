import { FormikErrors, FormikState } from "formik";
import moment, { Moment } from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";

import { MainViewAndControl, OutlayModalForm } from "../../components";
import { Spinner } from "../../components/ui";
import { AppContext, MainPageContext } from "../../contexts";
import { AppContextType, MainPageContextType } from "../../contexts/types";
// import SetTokenHeader from "../../hoc/SetTokenHeader/SetTokenHeader";
import { deleteDateEntrySagaActionCreator, getMainPageDataSagaActionCreator, postMainPageDataSagaActionCreator } from "../../store/mainPage/redux";
import { OutlayFormValues } from "../../store/mainPage/types";
import { RootState } from "../../store/types";
import { setEntries } from "../../utilityMethods";
import { InitialOutlayFormState } from "./types";

function MainPage(): JSX.Element {
    const { setRouteLock } = useContext<AppContextType>(AppContext);
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.authenticationReducer);
    const { lastSelectedDate, error, loading, selectedDateEntry: entryFromDate, grandTotal } = useSelector((state: RootState) => state.mainPageReducer);
    const [focused, setFocused] = useState<boolean>(false);
    const [date, setDate] = useState<Moment>(lastSelectedDate ? moment(lastSelectedDate) : moment());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialOutlayFormState] = useState<InitialOutlayFormState>({
        flowtype: "income",
        itype: "",
        etype: "",
        amount: "",
        iCustom: "",
        eCustom: ""
    });
    useEffect(() => {
        setRouteLock(true);
        if (token) dispatch(getMainPageDataSagaActionCreator({ date }));
    }, []);
    function modalHandler() {
        setIsOpen(!isOpen);
    }
    function dateChangeHandler(dateMoment?: Moment) {
        if (!dateMoment) {
            setDate(moment());
            return;
        }
        setDate(date);
        dispatch(getMainPageDataSagaActionCreator({ date }));
    }
    function deleteDateEntry(id: string, closeModalCallback: () => void) {
        dispatch(deleteDateEntrySagaActionCreator({ id, date, closeModalCallback }));
    }
    const mainPageContext = useMemo<MainPageContextType>(
        () => ({
            modalHandler,
            dateChangeHandler,
            focusChangeHandler: setFocused,
            deleteDateEntry
        }),
        [modalHandler, dateChangeHandler, setFocused, deleteDateEntry]
    );
    function handleSubmit(
        values: OutlayFormValues,
        resetForm: (nextState?: Partial<FormikState<OutlayFormValues>>) => void,
        /* eslint-disable */
        validateForm: (values?: any) => Promise<FormikErrors<OutlayFormValues>>
    ) {
        const selectedDate =
            date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? moment() : date.set({ hour: 23, minute: 59, millisecond: 0, second: 59 });
        const entries = setEntries(values, selectedDate, "");
        if (entries) {
            validateForm(values).then(() => {
                dispatch(postMainPageDataSagaActionCreator({ entries, modalHandler, resetForm }));
            });
        }
    }
    /*  @ts-ignore: Error has type any */
    const serverError = error && error.data.statusCode === 500;
    let mainContent = null;
    if (entryFromDate && !serverError && grandTotal.length && !loading) {
        mainContent = (
            <MainPageContext.Provider value={mainPageContext}>
                <MainViewAndControl date={date} focused={focused} entryFromDate={entryFromDate} grandTotal={grandTotal} />
            </MainPageContext.Provider>
        );
    }
    if (loading) {
        mainContent = <Spinner />;
    } else if (serverError && !entryFromDate && !grandTotal.length) {
        console.log("Error");
        mainContent = (
            <Row>
                <Col>
                    <h4>
                        <b>Sorry. Something went wrong. Please try again later.</b>
                    </h4>
                </Col>
            </Row>
        );
    }
    let outlayModalForm = null;
    if (date) {
        outlayModalForm = (
            <OutlayModalForm isOpen={isOpen} modalHandler={modalHandler} handleSubmit={handleSubmit} date={date} initialValues={initialOutlayFormState} />
        );
    }

    return (
        <div>
            {mainContent}
            {outlayModalForm}
        </div>
    );
}
export default MainPage;
