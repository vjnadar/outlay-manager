import "./FormFactory.scss";

import { Formik, FormikHelpers, FormikValues } from "formik";
import { memo, useEffect, useState } from "react";
import * as Yup from "yup";
import Reference from "yup/lib/Reference";

import ButtonFactory from "./ButtonFactory";
import { FieldTypes } from "./enums";
import FieldFactory from "./FieldFactory";
import { FormFactoryProps, FormFactorySchema, FormFactoryValues, Validation } from "./types";

function FormFactory({ formSpecs, submit, afterForm, beforeForm, secondButton }: FormFactoryProps): JSX.Element {
    const [initialValues, setInitialValues] = useState<FormFactoryValues>({});
    const [validationSchema, setValidationSchema] = useState({});
    function createValidationSchema(validation?: Validation) {
        switch (validation?.type) {
            case FieldTypes.Email: {
                return Yup.string().email(validation?.invalidEmailMessage).required(validation?.requiredMessage);
            }
            case FieldTypes.Text: {
                return Yup.string().required(validation?.requiredMessage);
            }
            case FieldTypes.Checkbox: {
                return Yup.bool().oneOf([true], validation?.requiredMessage);
            }
            case FieldTypes.RadioButtonSet: {
                return Yup.string().required(validation?.requiredMessage);
            }
            case FieldTypes.Number: {
                return Yup.number().positive(validation?.invalidNumberMessage).required(validation?.requiredMessage);
            }
            case FieldTypes.Password: {
                return Yup.string()
                    .min(validation?.minimum as number | Reference<number>, validation?.minimumPasswordLengthMessage)
                    .required(validation?.requiredMessage);
            }
            case FieldTypes.ConfirmPassword: {
                return Yup.string()
                    .oneOf([Yup.ref<string>(validation?.secondField as string), null], "The passwords don't match.")
                    .required(validation?.requiredMessage);
            }
            default: {
                return Yup.string().required(validation?.requiredMessage);
            }
        }
    }
    useEffect(() => {
        const fieldInitialValues = formSpecs.inputFields.reduce((obj, item) => {
            const theObject = obj;
            if (item.type === FieldTypes.ValidatorTextbox) {
                item?.values?.forEach((element) => {
                    theObject[element?.name] = element?.initialValue;
                });
            } else {
                theObject[item?.name] = item?.initialValue;
            }
            return theObject;
        }, {} as FormFactoryValues);
        const schema = formSpecs.inputFields.reduce((obj, item) => {
            if (item.validation) {
                const theObject = obj;
                if (item.type === FieldTypes.ValidatorTextbox) {
                    item?.values?.forEach((element) => {
                        theObject[element.name] = createValidationSchema(element.validation);
                    });
                } else {
                    theObject[item.name] = createValidationSchema(item.validation);
                }
            }
            return obj;
        }, {} as FormFactorySchema);
        const validationSchemaObj = Yup.object().shape(schema) as Yup.ObjectSchema<typeof schema>;
        setInitialValues(fieldInitialValues);
        setValidationSchema(validationSchemaObj);
    }, []);
    let form = null;
    if (Object.values(initialValues).length) {
        form = (
            <div className="container">
                <div className="title">
                    {formSpecs.title}&nbsp;
                    <br />
                    {beforeForm ? <div className="beforeForm">{beforeForm}</div> : null}
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values: FormikValues, actions: FormikHelpers<typeof initialValues>) => {
                        actions.validateForm(values).then(() => {
                            submit(values);
                        });
                    }}
                    validationSchema={validationSchema}
                >
                    {(formProps) => (
                        <form onSubmit={formProps.handleSubmit} className="form">
                            <FieldFactory inputFields={formSpecs.inputFields} formProps={formProps} />
                            <div className="buttonset">
                                <ButtonFactory secondButton={secondButton} buttonSpecs={formSpecs.buttons} resetForm={formProps.resetForm} />
                            </div>
                            {afterForm && afterForm}
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
    return <div>{form}</div>;
}
export default memo(FormFactory);
