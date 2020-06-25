import React from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import 'react-dates/initialize';
import DateRangePicker from "../../DatePicker/DateRangePicker";

const StatsForm = React.memo(props => {
  return (
    <>
      &nbsp;
      <Form onSubmit={props.getStats}>
        {props.income.length || props.expense.length ? (
          <Row>
            <Col
              xs={{ size: 12, offset: 0 }}
              sm={{ size: 12, offset: 0 }}
              md={{ size: 12, offset: 0 }}
              lg={{ size: 3, offset: 3 }}
              xl={{ size: 2, offset: 3 }}
            >
              <FormGroup>
                <Label for="flowtype">
                  <b>Flowtype</b>
                </Label>
                <Input
                  type="select"
                  name="flowtype"
                  id="flowtype"
                  bsSize="sm"
                  value={props.flowtype}
                  onChange={props.formHandler}
                >
                  {" "}
                  {props.income.length ? (
                    <option value="income">Income</option>
                  ) : (
                    <option disabled>Income(no data)</option>
                  )}
                  {props.expense.length ? (
                    <option value="expense">Expenditure</option>
                  ) : (
                    <option disabled>Expense(no data)</option>
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="graphtype">
                  <b>Graph type</b>
                </Label>
                <Input
                  type="select"
                  name="graphtype"
                  id="graphtype"
                  bsSize="sm"
                  value={props.graphtype}
                  onChange={props.formHandler}
                >
                  <option value="pie">Pie</option>
                  <option value="doughnut">Doughnut</option>
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row>
          <Col
            xs={{ size: 12, offset: 0 }}
            sm={{ size: 12, offset: 0 }}
            md={{ size: 12, offset: 0 }}
            lg={{ size: 3, offset: 3 }}
            xl={{ size: 2, offset: 3 }}
          >
            <FormGroup>
              <p>
                <b>Choose a date range</b>
              </p>
              <DateRangePicker
                dataAvailable={props.income.length || props.expense.length}
                id="daterange"
                dateChangeHandler={props.dateChangeHandler}
                focusChangeHandler={props.focusChangeHandler}
                startDate={props.startDate}
                endDate={props.endDate}
                focusedInput={props.focusedInput}
              />
            </FormGroup>
          </Col>
        </Row>
        {props.startDate && props.endDate ? (
          <Row>
            <Col
              xs={{ size: 12, offset: 0 }}
              sm={{ size: 12, offset: 0 }}
              md={{ size: 12, offset: 0 }}
              lg={{ size: 3, offset: 3 }}
              xl={{ size: 2, offset: 3 }}
            >
              <FormGroup>
                <Button type="submit" color="info">
                  Submit Range
                </Button>
              </FormGroup>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Form>
    </>
  );
});

export default StatsForm;
