import { Formik } from "formik";
import React, { PureComponent } from "react";

import ButtonFactory from "./ButtonFactory/ButtonFactory";
import FieldFactory from "./FieldFactory/FieldFactory";
import * as Yup from "yup";
import "./FormFactory.scss";

class FormFactory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: null,
      validationSchema: null
    };
  }
  componentDidMount() {
    const { formSpecs } = this.props;
    const fieldInitialValues = formSpecs.inputFields.reduce((obj, item) => {
      obj[item["name"]] = item.initialValue;
      return obj;
    }, {});
    const schema = formSpecs.inputFields.reduce((obj, item) => {
      obj[item["name"]] = this.setValidationSchema(item.validation);
      return obj;
    }, {});
    const validationSchema = Yup.object().shape(schema);
    this.setState({
      initialValues: fieldInitialValues,
      validationSchema
    });
  }

  setValidationSchema = validation => {
    switch (validation.type) {
      case "email": {
        return Yup.string()
          .email(validation.invalidEmailMessage)
          .required(validation.requiredMessage);
      }
      case "text": {
        return Yup.string().required(validation.requiredMessage);
      }
      case "number": {
        return Yup.number().required(validation.requiredMessage);
      }
      case "password": {
        return Yup.string()
          .min(validation.min, validation.minPasswordLenMessage)
          .required(validation.requiredMessage);
      }
      default: {
        return;
      }
    }
  };

  render() {
    const { formSpecs, submit, afterForm, beforeForm } = this.props;
    const { initialValues, validationSchema } = this.state;
    let form = null;
    if (initialValues) {
      form = (
        <>
          <div className="container">
            {beforeForm && beforeForm}
            <div className="title">{formSpecs.title}</div>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                actions.validateForm(values).then(() => {
                  submit(values, actions.resetForm);
                });
              }}
              validationSchema={validationSchema}
              render={formProps => (
                <form onSubmit={formProps.handleSubmit} className="form">
                  <FieldFactory
                    inputFields={formSpecs.inputFields}
                    formProps={formProps}
                  />

                  <div className="buttonset">
                    <ButtonFactory
                      main={this}
                      buttonSpecs={formSpecs.buttons}
                      resetForm={formProps.resetForm}
                    />
                  </div>
                  {afterForm && afterForm}
                </form>
              )}
            />
          </div>
        </>
      );
    } else {
      form = <></>;
    }
    return <>{form}</>;
  }
}
export default FormFactory;
