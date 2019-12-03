import React from "react";
// import { Form, FormGroup, Input, Button, Label } from "reactstrap";

import OutlayForm from "../../OutlayForm/OutlayForm";
import { Formik } from "formik";
import { outlayFormValidationSchema } from "../../../utilityMethods/utilityMethods";
import Modal from "../../UI/Modal/Modal";

const OutlayModalForm = props => {
  const { handleSubmit, initialValues } = props;
  return (
    <Modal
      modal={props.modal}
      modalHandler={props.modalHandler}
      header={`Entry (${props.date.format("DD-MM-YYYY")})`}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions.resetForm, actions.validateForm);
        }}
        validationSchema={outlayFormValidationSchema()}
        render={formProps => (
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
};

export default OutlayModalForm;
