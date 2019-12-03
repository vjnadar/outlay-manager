import React, { useContext } from "react";
import { Row, Col, Button } from "reactstrap";

import DatePicker from "../../DatePicker/DatePicker";
import Post from "../../MainPageComponents/Post/Post";
import { MainPageContext } from "../../../contexts/contexts";
import GrandTotalTable from "../../MainPageComponents/GrandTotalTable/GrandTotalTable";
import "./MainViewAndControl.scss";

const MainViewAndControl = React.memo(props => {
  const mainPageContext = useContext(MainPageContext);
  const income = props.grandTotal[1].totalAmount;
  const expense = props.grandTotal[0].totalAmount;

  return (
    <>
      <Row>
        <Col
          xs={{ offset: 8 }}
          sm={{ offset: 1 }}
          md={{ offset: 1 }}
          lg={{ offset: 4 }}
          xl={{ offset: 3 }}
        >
          <DatePicker
            date={props.date}
            dateChange={mainPageContext.dateChangeHandler}
            focused={props.focused}
            focusChange={mainPageContext.focusChangeHandler}
          />
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
          <Button
            outline
            color="link"
            size="lg"
            onClick={mainPageContext.modalHandler}
            disabled={props.date === null}
            className="mbutton"
          >
            <i className="fas fa-money-bill-alt"></i>
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
          <GrandTotalTable
            income={income}
            expense={expense}
            totalBalance={income - expense}
          />
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
          {!!(
            (props.entryFromDate && props.entryFromDate.income.length) ||
            (props.entryFromDate && props.entryFromDate.expense.length)
          ) ? (
            <Post entryFromDate={props.entryFromDate} />
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
        ></Col>
      </Row>
    </>
  );
});
export default MainViewAndControl;
