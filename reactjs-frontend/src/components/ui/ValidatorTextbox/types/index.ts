import { FormikProps } from "formik";

import { FormFactoryValues } from "../../../FormFactory/types";

export type ValidatorTextboxProps = {
    formProps: FormikProps<FormFactoryValues>;
    fieldName: string;
};
