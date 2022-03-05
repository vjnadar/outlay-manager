import { FormikProps } from "formik";

import { FormFactoryValues, InputField } from "../../types";

export type FieldFactoryProps = {
    formProps: FormikProps<FormFactoryValues>;
    inputFields: InputField[];
};
