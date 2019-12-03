import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Row, Col, Button } from "reactstrap";

import * as actions from "../../store/actions/authenticationActions/index";
import Form from "../../components/FormFactory/FormFactory";
import { signinFormSpecs } from "./signinFormSpecs";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import "./Signin.scss";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMessage: ""
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    this._mounted = true;
  }

  modalHandler = message => {
    this.setState(prevState => {
      return {
        modal: !prevState.modal,
        modalMessage: prevState.modalMessage === "" ? message : ""
      };
    });
  };
  submit(credentials, resetForm) {
    const { signinAction } = this.props;
    signinAction(credentials, resetForm, this.modalHandler);
  }

  navigateToSignUpPage = () => {
    this.props.history.push("/signup");
  };

  render() {
    const { error, loading, logoutMessage } = this.props;
    const { modal, modalMessage } = this.state;
    let content = <></>;
    let beforeForm;

    if (logoutMessage) {
      beforeForm = (
        <>
          <Alert className="alert" color="warning">
            {logoutMessage}
          </Alert>
        </>
      );
    } else {
      beforeForm = <></>;
    }

    const afterForm = (
      <>
        <small className="smallText">
          Don`t have an account? Sign up in no time.
        </small>
        <Button
          color="success"
          type="button"
          className="signupNav"
          onClick={this.navigateToSignUpPage}
        >
          Sign Up
        </Button>
      </>
    );
    const errorModal = (
      <>
        <Modal header="Alert!" modal={modal} modalHandler={this.modalHandler}>
          <p>{modalMessage}</p>
          <Button onClick={this.modalHandler} outline color="info">
            OK
          </Button>
        </Modal>
      </>
    );
    if (loading) {
      content = (
        <>
          <Spinner />
        </>
      );
    } else {
      content = (
        <>
          <Form
            formSpecs={signinFormSpecs}
            submit={this.submit}
            error={error}
            beforeForm={beforeForm}
            afterForm={afterForm}
          />
        </>
      );
    }
    if (error && error.type === "serverError") {
      content = (
        <>
          <Row>
            <Col>
              <b>Sorry. Something went wrong. Please try again later.</b>
            </Col>
          </Row>
        </>
      );
    }
    return (
      <>
        {errorModal}
        {content}
      </>
    );
  }
}

const mapStateToProp = state => {
  return {
    loading: state.authenticationReducer.loading,
    logoutMessage: state.authenticationReducer.message,
    error: state.authenticationReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signinAction: (credentials, resetForm, modalHandler) => {
      dispatch(
        actions.signinPostCredentials(credentials, resetForm, modalHandler)
      );
    }
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(Signin);
