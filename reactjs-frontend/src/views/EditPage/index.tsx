import { Formik } from "formik";
import moment from "moment";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

import { Card, Modal, OutlayForm, Spinner } from "../../components";
import { AppContext } from "../../contexts";
import { updateDateEntrySagaActionCreator } from "../../store/mainPage/redux";
import { RootState } from "../../store/types";
import { findIfCustom, outlayFormValidationSchema, setEntries } from "../../utilityMethods";
import { InitialOutlayFormState } from "../MainPage/types";
import { LocationType } from "./types";

function EditPage(): JSX.Element {
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.authenticationReducer);
    const { setRouteLock } = useContext(AppContext);
    const [initialOutlayFormState] = useState<InitialOutlayFormState>({
        flowtype: (location.state as LocationType).fromTable.flowtype,
        itype:
            (location.state as LocationType).fromTable.flowtype === "income" && findIfCustom((location.state as LocationType).fromTable.type, "income")
                ? (location.state as LocationType).fromTable.type
                : (location.state as LocationType).fromTable.flowtype === "expense"
                ? ""
                : "Custom",
        etype:
            (location.state as LocationType).fromTable.flowtype === "expense" && findIfCustom((location.state as LocationType).fromTable.type, "expense")
                ? (location.state as LocationType).fromTable.type
                : (location.state as LocationType).fromTable.flowtype === "income"
                ? ""
                : "Custom",
        amount: (location.state as LocationType).fromTable.amount,
        iCustom:
            !findIfCustom((location.state as LocationType).fromTable.type, "income") && (location.state as LocationType).fromTable.flowtype === "income"
                ? (location.state as LocationType).fromTable.type
                : "",
        eCustom:
            !findIfCustom((location.state as LocationType).fromTable.type, "expense") && (location.state as LocationType).fromTable.flowtype === "expense"
                ? (location.state as LocationType).fromTable.type
                : ""
    });
    const [isOpen, setIsOpen] = useState(false);
    function modalHandler() {
        setIsOpen(!isOpen);
    }
    function goBack() {
        setRouteLock(true);
    }
    function updateRecord(values: InitialOutlayFormState) {
        const { _id, date, time } = (location.state as LocationType).fromTable;
        const dateTime = new Date(`${date} ${time}`);
        const selectedDate = moment(dateTime).toISOString();
        const newEntry = setEntries(values, selectedDate, _id);
        dispatch(updateDateEntrySagaActionCreator({ newEntry, modalHandler }));
    }

    let contents = null;
    if (loading) {
        contents = <Spinner />;
    } else {
        contents = (
            <>
                <Modal
                    isOpen={isOpen}
                    modalHandler={() => {
                        modalHandler();
                    }}
                    header="Update was successful!"
                    backdrop="static"
                >
                    <Button
                        onClick={() => {
                            goBack();
                        }}
                    >
                        OK
                    </Button>
                </Modal>

                <Container>
                    <Card header={<h3>Update your entry</h3>} body>
                        <Row>
                            <Col
                                xs={{ size: 10, offset: 1 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 5, offset: 4 }}
                                xl={{ size: 5, offset: 3 }}
                            />
                        </Row>
                        &nbsp;
                        <Row>
                            <Col
                                xs={{ size: 10, offset: 1 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 5, offset: 4 }}
                                xl={{ size: 5, offset: 3 }}
                            >
                                <Formik
                                    initialValues={initialOutlayFormState}
                                    onSubmit={(values) => {
                                        updateRecord(values);
                                    }}
                                    validationSchema={outlayFormValidationSchema()}
                                >
                                    {(formProps) => (
                                        <OutlayForm
                                            handleChange={formProps.handleChange}
                                            handleBlur={formProps.handleBlur}
                                            handleSubmit={formProps.handleSubmit}
                                            flowtype={formProps.values.flowtype}
                                            itype={formProps.values.itype}
                                            etype={formProps.values.etype}
                                            amount={formProps.values.amount}
                                            buttonColor="editPage"
                                            errors={formProps.errors}
                                            touched={formProps.touched}
                                            isValid={formProps.isValid}
                                            iCustom={formProps.values.iCustom}
                                            eCustom={formProps.values.eCustom}
                                            setFieldValue={formProps.setFieldValue}
                                        />
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                xs={{ size: 10, offset: 1 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 5, offset: 4 }}
                                xl={{ size: 5, offset: 3 }}
                            >
                                <Button
                                    onClick={() => {
                                        goBack();
                                    }}
                                >
                                    Go back
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </>
        );
    }
    /* eslint react/jsx-no-useless-fragment:0 */
    return <>{contents}</>;
}

export default EditPage;
