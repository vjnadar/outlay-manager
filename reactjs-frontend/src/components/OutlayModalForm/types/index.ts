import { FormikErrors, FormikState } from "formik";
import { Moment } from "moment";

import { OutlayFormValues } from "../../../store/mainPage/types";
import { InitialOutlayFormState } from "../../../views/MainPage/types";

export type OutlayModalFormProps = {
    isOpen: boolean;
    modalHandler: () => void;
    handleSubmit: (
        values: OutlayFormValues,
        resetForm: (nextState?: Partial<FormikState<OutlayFormValues>>) => void,
        /* eslint-disable */
        validateForm: (values?: any) => Promise<FormikErrors<OutlayFormValues>>
    ) => void;
    initialValues: InitialOutlayFormState;
    date: Moment;
};
