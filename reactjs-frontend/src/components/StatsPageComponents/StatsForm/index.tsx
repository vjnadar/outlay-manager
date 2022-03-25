import "react-dates/initialize";

import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { DateRangePicker } from "../..";
import { StatsFormProps } from "./types";

export const StatsForm = React.memo(
    ({
        getStats,
        income,
        expense,
        flowtype,
        startDate,
        endDate,
        formHandler,
        dateChangeHandler,
        focusChangeHandler,
        focusedInput,
        graphtype
    }: StatsFormProps) => {
        return (
            <>
                &nbsp;
                <Form onSubmit={getStats}>
                    {income.length || expense.length ? (
                        <Row>
                            <Col
                                xs={{ size: 11, offset: 0 }}
                                sm={{ size: 11, offset: 0 }}
                                md={{ size: 11, offset: 0 }}
                                lg={{ size: 3, offset: 3 }}
                                xl={{ size: 2, offset: 3 }}
                            >
                                <FormGroup>
                                    <Label for="flowtype">
                                        <b>Flowtype</b>
                                    </Label>
                                    <Input type="select" name="flowtype" id="flowtype" bsSize="sm" value={flowtype} onChange={formHandler}>
                                        {income.length ? <option value="income">Income</option> : <option disabled>Income(no data)</option>}
                                        {expense.length ? <option value="expense">Expenditure</option> : <option disabled>Expense(no data)</option>}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="graphtype">
                                        <b>Graph type</b>
                                    </Label>
                                    <Input type="select" name="graphtype" id="graphtype" bsSize="sm" value={graphtype} onChange={formHandler}>
                                        <option value="pie">Pie</option>
                                        <option value="doughnut">Doughnut</option>
                                        <option value="bar">Bar</option>
                                        <option value="line">Line</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    ) : null}
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
                                    dataAvailable={!!income.length || !!expense.length}
                                    dateChangeHandler={dateChangeHandler}
                                    focusChangeHandler={focusChangeHandler}
                                    startDate={startDate}
                                    endDate={endDate}
                                    focusedInput={focusedInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {startDate && endDate ? (
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
                    ) : null}
                </Form>
            </>
        );
    }
);
