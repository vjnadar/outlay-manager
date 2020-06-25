import React, { Component } from "react";
import { Formik } from "formik";
import { Row, Col, Container, Button } from "reactstrap";
import { connect } from "react-redux";

import axios from "../../http/axios";
import { AppContext } from "../../contexts/contexts";
import Card from "../../components/UI/Card/Card";
import * as actions from "../../store/actions/editPageActions/index";
import EditPageMethods from "./EditPageMethods/EditPageMethods";
import { findIfCustom } from "../../utilityMethods/utilityMethods";
import Handlers from "../MainPage/Handlers/Handlers";
import Modal from "../../components/UI/Modal/Modal";
import OutlayForm from "../../components/OutlayForm/OutlayForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import { outlayFormValidationSchema } from "../../utilityMethods/utilityMethods";
import SetTokenHeader from "../../hoc/SetTokenHeader/SetTokenHeader";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        flowtype: this.props.location.fromTable.flowtype,
        itype:
          this.props.location.fromTable.flowtype === "income" &&
          findIfCustom(this.props.location.fromTable.type, "income")
            ? this.props.location.fromTable.type
            : this.props.location.fromTable.flowtype === "expense"
            ? ""
            : "Custom",
        etype:
          this.props.location.fromTable.flowtype === "expense" &&
          findIfCustom(this.props.location.fromTable.type, "expense")
            ? this.props.location.fromTable.type
            : this.props.location.fromTable.flowtype === "income"
            ? ""
            : "Custom",
        iCustom:
          !findIfCustom(this.props.location.fromTable.type, "income") &&
          this.props.location.fromTable.flowtype === "income"
            ? this.props.location.fromTable.type
            : "",
        eCustom:
          !findIfCustom(this.props.location.fromTable.type, "expense") &&
          this.props.location.fromTable.flowtype === "expense"
            ? this.props.location.fromTable.type
            : "",
        amount: this.props.location.fromTable.amount,
      },
      modal: false,
    };
    this.editPageMethods = new EditPageMethods(this);
    this.handlers = new Handlers(this);
  }

  static contextType = AppContext;

  render() {
    const { modal } = this.state;
    const { loading } = this.props;
    let contents = <></>;
    if (loading) {
      contents = (
        <>
          <Spinner />
        </>
      );
    } else {
      contents = (
        <>
          <Modal
            modal={modal}
            modalHandler={this.handlers.modalHandler}
            header="Update was successful!"
            backdrop="static"
          >
            <Button onClick={this.editPageMethods.goBack}>OK</Button>
          </Modal>

          <Container>
            <Card header={<h3>Update your entry</h3>} body={true}>
              <Row>
                <Col
                  xs={{ size: 10, offset: 1 }}
                  sm={{ size: 10, offset: 1 }}
                  md={{ size: 10, offset: 1 }}
                  lg={{ size: 5, offset: 4 }}
                  xl={{ size: 5, offset: 3 }}
                ></Col>
              </Row>
              &nbsp;
              <Row>
                <Col
                  xs={{ size: 10, offset: 1 }}
                  sm={{ size: 10, offset: 1 }}
                  md={{ size: 10, offset: 1 }}
                  lg={{ size: 5, offset: 4 }}
                  xl={{ size: 5, offset: 3 }}
                >
                  <Formik
                    initialValues={this.state.initialValues}
                    onSubmit={(values, actions) => {
                      this.editPageMethods.updateRecord(values);
                    }}
                    validationSchema={outlayFormValidationSchema()}
                    render={(formProps) => (
                      <OutlayForm
                        handleChange={formProps.handleChange}
                        handleBlur={formProps.handleBlur}
                        handleSubmit={formProps.handleSubmit}
                        flowtype={formProps.values.flowtype}
                        itype={formProps.values.itype}
                        etype={formProps.values.etype}
                        amount={formProps.values.amount}
                        buttonColor="editPage"
                        errors={formProps.errors}
                        touched={formProps.touched}
                        isValid={formProps.isValid}
                        iCustom={formProps.values.iCustom}
                        eCustom={formProps.values.eCustom}
                        setFieldValue={formProps.setFieldValue}
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  xs={{ size: 10, offset: 1 }}
                  sm={{ size: 10, offset: 1 }}
                  md={{ size: 10, offset: 1 }}
                  lg={{ size: 5, offset: 4 }}
                  xl={{ size: 5, offset: 3 }}
                >
                  <Button onClick={this.editPageMethods.goBack}>Go back</Button>
                </Col>
              </Row>
            </Card>
          </Container>
        </>
      );
    }
    return <>{contents}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authenticationReducer.token,
    loading: state.editPageReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDateEntryAction: (newEntry, oldEntry, modalHandlerCallback) => {
      dispatch(
        actions.updateDateEntry(newEntry, oldEntry, modalHandlerCallback)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetTokenHeader(EditPage, axios));
