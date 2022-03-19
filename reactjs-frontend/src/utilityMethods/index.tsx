import * as Yup from "yup";

import { expenseArray, incomeArray } from "../constants";
import { Entry, OutlayFormValues } from "../store/mainPage/types";

export function setEntries(values: OutlayFormValues, selectedDate: string, _id: string): Entry {
    const entries = {
        _id: _id || "",
        flowtype: values.flowtype,
        type:
            values.flowtype === "income" && values.itype !== "Custom"
                ? values.itype
                : values.flowtype === "expense" && values.etype !== "Custom"
                ? values.etype
                : values.flowtype === "income" && values.itype === "Custom"
                ? values.iCustom
                : values.eCustom,

        amount: values.amount,
        dateTime: selectedDate
    };
    return entries;
}

export function findIfCustom(value: string, type: string): boolean {
    let result;
    if (type === "income") {
        result = incomeArray.filter((val) => val === value && value !== "Custom");
    } else {
        result = expenseArray.filter((val) => val === value && value !== "Custom");
    }
    return !!result.length;
}

export const outlayFormValidationSchema = () => {
    const validationSchema = Yup.object().shape({
        flowtype: Yup.string().required(),
        etype: Yup.string().when("flowtype", {
            is: "expense",
            then: Yup.string().required("Choose a type value."),
            otherwise: Yup.string().min(0).notRequired()
        }),
        itype: Yup.string().when("flowtype", {
            is: "income",
            then: Yup.string().required("Choose a type value."),
            otherwise: Yup.string().min(0).notRequired()
        }),
        iCustom: Yup.string().when("itype", {
            is: "Custom",
            then: Yup.string().max(15, "The label should not be more than 15 letters long.").required("This field is required and must not be empty."),
            otherwise: Yup.string().ensure().min(0).notRequired()
        }),
        eCustom: Yup.string().when("etype", {
            is: "Custom",
            then: Yup.string().max(15, "The label should not be more than 15 letters long.").required("This field is required and must not be empty."),
            otherwise: Yup.string().ensure().min(0).notRequired()
        }),
        amount: Yup.number().positive("Enter a positive number.").required("This field is required and must be filled.")
    });
    return validationSchema;
};
