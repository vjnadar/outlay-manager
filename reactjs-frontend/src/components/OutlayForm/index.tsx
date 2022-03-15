import "./OutlayForm.scss";

import { useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { expenseArray, incomeArray } from "../../constants";
import { OutlayFormProps } from "./types";

function OutlayForm({
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    setFieldValue,
    flowtype,
    itype,
    etype,
    iCustom,
    eCustom,
    amount
}: OutlayFormProps): JSX.Element {
    useEffect(() => {
        if (flowtype === "expense" && itype) {
            setFieldValue("itype", "");
            setFieldValue("iCustom", "");
        } else if (flowtype === "income" && etype) {
            setFieldValue("etype", "");
            setFieldValue("eCustom", "");
        }
    }, [flowtype, itype, etype, setFieldValue]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="flowtype">Flow type</Label>
                <Input type="select" id="flowtype" name="flowtype" value={flowtype} onChange={handleChange} onBlur={handleBlur}>
                    <option value="income">Income</option>
                    <option value="expense">Expenditure</option>
                </Input>
            </FormGroup>
            <FormGroup>
                {flowtype === "income" ? (
                    <>
                        <Label for="itype">Type</Label>
                        <Input type="select" id="itype" name="itype" value={itype} onChange={handleChange} onBlur={handleBlur}>
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
                        <Input type="select" id="etype" name="etype" value={etype} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Select the expense type</option>
                            {expenseArray.map((expenseType, index) => (
                                <option key={index} value={expenseType}>
                                    {expenseType}
                                </option>
                            ))}
                        </Input>
                    </>
                )}
                {errors[flowtype === "income" ? "itype" : "etype"] && touched[flowtype === "income" ? "itype" : "etype"] && (
                    <small className="errors">{flowtype === "income" ? errors.itype : errors.etype}</small>
                )}
            </FormGroup>
            {/* eslint no-nested-ternary: 0 */}
            {itype === "Custom" ? (
                <FormGroup>
                    <Label for="custom">{`Custom ${flowtype} type`}</Label>
                    <Input
                        type="text"
                        id="iCustom"
                        name="iCustom"
                        value={iCustom}
                        placeholder="Type in a custom value"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.iCustom && touched.iCustom && <small className="errors">{errors.iCustom}</small>}
                </FormGroup>
            ) : etype === "Custom" ? (
                <FormGroup>
                    <Label for="custom">{`Custom ${flowtype} type`}</Label>
                    <Input
                        type="text"
                        id="eCustom"
                        name="eCustom"
                        value={eCustom}
                        placeholder="Type in a custom value"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.eCustom && touched.eCustom && <small className="errors">{errors.eCustom}</small>}
                </FormGroup>
            ) : null}
            <FormGroup>
                <Label for="amount">Amount</Label>
                <Input type="number" id="amount" name="amount" value={amount} onChange={handleChange} onBlur={handleBlur} />
                {errors.amount && touched.amount && <small className="errors">{errors.amount}</small>}
            </FormGroup>
            <FormGroup>
                <Button type="submit" outline color="success">
                    Add {flowtype === "income" ? "income" : "expense"}
                </Button>
            </FormGroup>
        </Form>
    );
}

export default OutlayForm;
