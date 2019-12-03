import React, { useEffect } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import { incomeArray, expenseArray } from "../../constants/entryTypes";
import "./OutlayForm.scss";

const OutlayForm = props => {
  useEffect(() => {
    if (props.flowtype === "expense" && props.itype) {
      props.setFieldValue("itype", "");
      props.setFieldValue("iCustom", "");
    } else if (props.flowtype === "income" && props.etype) {
      props.setFieldValue("etype", "");
      props.setFieldValue("eCustom", "");
    }
  }, [props.flowtype]);

  return (
    <>
      <Form onSubmit={props.handleSubmit}>
        <FormGroup>
          <Label for="flowtype">Flow type</Label>
          <Input
            type="select"
            id="flowtype"
            name="flowtype"
            value={props.flowtype}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          >
            <option value="income">Income</option>
            <option value="expense">Expenditure</option>
          </Input>
        </FormGroup>
        <FormGroup>
          {props.flowtype === "income" ? (
            <>
              <Label for="itype">Type</Label>
              <Input
                type="select"
                id="itype"
                name="itype"
                value={props.itype}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              >
                <option value="">Select the income type</option>
                {incomeArray.map((incomeType, index) => (
                  <option key={index} value={incomeType}>
                    {incomeType}
                  </option>
                ))}
              </Input>
            </>
          ) : (
            <>
              <Label for="etype">Type</Label>
              <Input
                type="select"
                id="etype"
                name="etype"
                value={props.etype}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              >
                <option value="">Select the expense type</option>
                {expenseArray.map((expenseType, index) => (
                  <option key={index} value={expenseType}>
                    {expenseType}
                  </option>
                ))}
              </Input>
            </>
          )}
          {props.errors[props.flowtype === "income" ? "itype" : "etype"] &&
            props.touched[props.flowtype === "income" ? "itype" : "etype"] && (
              <small className="errors">
                {props.flowtype === "income"
                  ? props.errors.itype
                  : props.errors.etype}
              </small>
            )}
        </FormGroup>
        {props.itype === "Custom" ? (
          <FormGroup>
            <Label for="custom">{`Custom ${props.flowtype} type`}</Label>
            <Input
              type="text"
              id="iCustom"
              name="iCustom"
              value={props.iCustom}
              placeholder="Type in a custom value"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.errors.iCustom && props.touched.iCustom && (
              <small className="errors">{props.errors.iCustom}</small>
            )}
          </FormGroup>
        ) : props.etype === "Custom" ? (
          <FormGroup>
            <Label for="custom">{`Custom ${props.flowtype} type`}</Label>
            <Input
              type="text"
              id="eCustom"
              name="eCustom"
              value={props.eCustom}
              placeholder="Type in a custom value"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.errors.eCustom && props.touched.eCustom && (
              <small className="errors">{props.errors.eCustom}</small>
            )}
          </FormGroup>
        ) : (
          <></>
        )}
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={props.amount}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          {props.errors.amount && props.touched.amount && (
            <small className="errors">{props.errors.amount}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Button type="submit" outline color="success">
            Add {props.flowtype === "income" ? "income" : "expense"}
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default OutlayForm;
