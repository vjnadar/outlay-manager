import { BooleanSchema, NumberSchema, StringSchema } from "yup";

import { CommonTypeProperties } from "../../../generalTypes";
import { ButtonTypes } from "../ButtonFactory/enums";
import { FieldTypes } from "../enums";

export type Validation = {
    type:
        | FieldTypes.Email
        | FieldTypes.Text
        | FieldTypes.Number
        | FieldTypes.Select
        | FieldTypes.RadioButtonSet
        | FieldTypes.Checkbox
        | FieldTypes.CustomImageUpload
        | FieldTypes.ValidatorTextbox
        | FieldTypes.FormText
        | FieldTypes.Link
        | FieldTypes.Password
        | FieldTypes.ConfirmPassword;
    invalidNumberMessage?: string;
    invalidEmailMessage?: string;
    requiredMessage: string;
    minimum?: number;
    minimumPasswordLengthMessage?: string;
    secondField?: string;
};
export type InitialValue = string | boolean;
export type ValidatorTextValues = {
    name: string;
    initialValue: InitialValue;
    validation: Validation;
};
export type RadioButtonOption = {
    type: string;
    name: string;
    label: string;
    radioValue: string;
};
export type SelectBoxOption = {
    value: string;
    displayValue: string;
};
export type Credentials = {
    [key: string]: string | number | boolean;
};
export type InputField = {
    type:
        | FieldTypes.Email
        | FieldTypes.Text
        | FieldTypes.Number
        | FieldTypes.Select
        | FieldTypes.RadioButtonSet
        | FieldTypes.Checkbox
        | FieldTypes.CustomImageUpload
        | FieldTypes.ValidatorTextbox
        | FieldTypes.FormText
        | FieldTypes.Link
        | FieldTypes.Password
        | FieldTypes.ConfirmPassword;
    text?: string;
    name: string;
    label?: string;
    to?: string;
    legend?: string;
    values?: ValidatorTextValues[];
    initialValue?: InitialValue;
    radioButtonOptions?: RadioButtonOption[];
    selectBoxOptions?: SelectBoxOption[];
    validation?: Validation;
    checkValue?: string;
    placeholder?: string;
};
export type ButtonSet = {
    setType: ButtonTypes.Default | ButtonTypes.Reverse;
    buttonNames: {
        ok: string;
        cancel: string;
    };
};
export type Buttons = {
    buttonSet: ButtonSet;
};
export type FormSpecification = {
    title?: string;
    inputFields: InputField[];
    buttons: Buttons;
};
export type FormFactoryProps = {
    formSpecs: FormSpecification;
    submit: (credentials: Credentials) => void;
    beforeForm?: JSX.Element;
    afterForm?: JSX.Element;
    secondButton?: () => void;
};
export type FormFactoryValues = CommonTypeProperties<string | boolean | undefined>;
export type FormFactorySchema = CommonTypeProperties<StringSchema | NumberSchema | BooleanSchema>;
