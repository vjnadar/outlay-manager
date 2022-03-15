import { FormikErrors, FormikTouched } from "formik";

export type OutlayFormProps = {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    /* eslint-disable */
    handleBlur: (e: any) => void;
    handleChange: (e: React.ChangeEvent<any>) => void;
    touched: FormikTouched<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    flowtype: string;
    itype: string;
    etype: string;
    iCustom: string;
    eCustom: string;
    amount: string;
    errors: FormikErrors<any>;
    buttonColor?: string;
    isValid?: boolean;
};
