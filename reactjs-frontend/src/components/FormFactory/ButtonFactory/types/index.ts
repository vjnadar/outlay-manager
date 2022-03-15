import { FormikState } from "formik";

import { Buttons, FormFactoryValues } from "../../types";

export type ButtonFactoryProps = {
    buttonSpecs: Buttons;
    secondButton?: () => void;
    resetForm: (nextState?: Partial<FormikState<FormFactoryValues>>) => void;
};
