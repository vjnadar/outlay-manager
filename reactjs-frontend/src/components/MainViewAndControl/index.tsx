import "./MainViewAndControl.scss";

import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useContext } from "react";
import { Button, Col, Row } from "reactstrap";

import { MainPageContext } from "../../contexts";
import { SingleDatePicker as DatePicker } from "..";
import GrandTotalTable from "./GrandTotalTable";
import Post from "./Post";
import { MainViewAndControlProps } from "./types";

function MainViewAndControl({ grandTotal, date, focused, entryFromDate }: MainViewAndControlProps): JSX.Element {
    const mainPageContext = useContext(MainPageContext);
    const income = grandTotal[1].totalAmount;
    const expense = grandTotal[0].totalAmount;

    return (
        <>
            <Row>
                <Col xs={{ offset: 7 }} sm={{ offset: 1 }} md={{ offset: 1 }} lg={{ offset: 4 }} xl={{ offset: 3 }}>
                    <DatePicker date={date} dateChange={mainPageContext.dateChangeHandler} focused={focused} focusChange={mainPageContext.focusChangeHandler} />
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col
                    xs={{ size: 1, offset: 9 }}
                    sm={{ size: 1, offset: 1 }}
                    md={{ size: 1, offset: 1 }}
                    lg={{ size: 2, offset: 4 }}
                    xl={{ size: 2, offset: 3 }}
                >
                    <Button outline color="link" size="lg" onClick={mainPageContext.modalHandler} disabled={date === null} className="mbutton">
                        <FontAwesomeIcon icon={faMoneyBillAlt} />
                    </Button>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col
                    xs={{ size: 12, offset: 0 }}
                    sm={{ size: 12, offset: 0 }}
                    md={{ size: 10, offset: 1 }}
                    lg={{ size: 5, offset: 4 }}
                    xl={{ size: 5, offset: 3 }}
                >
                    <GrandTotalTable income={income} expense={expense} totalBalance={income - expense} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col
                    xs={{ size: 12, offset: 0 }}
                    sm={{ size: 12, offset: 0 }}
                    md={{ size: 10, offset: 1 }}
                    lg={{ size: 5, offset: 4 }}
                    xl={{ size: 5, offset: 3 }}
                >
                    {entryFromDate?.income?.length || entryFromDate?.expense?.length ? (
                        <Post entryFromDate={entryFromDate} />
                    ) : (
                        <h4>No entry from this date. Want to add something?</h4>
                    )}
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col
                    xs={{ size: 12, offset: 0 }}
                    sm={{ size: 12, offset: 0 }}
                    md={{ size: 10, offset: 1 }}
                    lg={{ size: 5, offset: 4 }}
                    xl={{ size: 5, offset: 3 }}
                />
            </Row>
        </>
    );
}
export default memo(MainViewAndControl);
