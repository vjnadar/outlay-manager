import { Formik } from "formik";
import React from "react";

import { outlayFormValidationSchema } from "../../utilityMethods";
import { Modal, OutlayForm } from "..";
import { OutlayModalFormProps } from "./types";

function OutlayModalForm({ isOpen, modalHandler, handleSubmit, initialValues, date }: OutlayModalFormProps): JSX.Element {
    return (
        <Modal isOpen={isOpen} modalHandler={modalHandler} header={`Entry (${date.format("DD-MM-YYYY")})`}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions.resetForm, actions.validateForm);
                }}
                validationSchema={outlayFormValidationSchema()}
                render={(formProps) => (
                    <OutlayForm
                        handleSubmit={formProps.handleSubmit}
                        handleBlur={formProps.handleBlur}
                        handleChange={formProps.handleChange}
                        flowtype={formProps.values.flowtype}
                        itype={formProps.values.itype}
                        etype={formProps.values.etype}
                        iCustom={formProps.values.iCustom}
                        eCustom={formProps.values.eCustom}
                        amount={formProps.values.amount}
                        errors={formProps.errors}
                        touched={formProps.touched}
                        setFieldValue={formProps.setFieldValue}
                    />
                )}
            />
        </Modal>
    );
}

export default OutlayModalForm;
