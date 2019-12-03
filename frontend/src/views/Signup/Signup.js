import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import * as actions from "../../store/actions/authenticationActions/index";
import Form from "../../components/FormFactory/FormFactory";
import { signupFormSpecs } from "./signupFormSpecs";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import "./Signup.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, modalMessage: "" };
    this.submit = this.submit.bind(this);
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
    const { signupAction } = this.props;
    signupAction(credentials, resetForm, this.modalHandler);
  }

  navigateToSignInPage = () => {
    this.props.history.push("/");
  };

  render() {
    const { error, loading } = this.props;
    const { modal, modalMessage } = this.state;
    let content = <></>;
    const afterForm = (
      <>
        <small className="smallText">Already have an account? Sign in.</small>
        <Button
          color="success"
          type="button"
          className="signinNav"
          onClick={this.navigateToSignInPage}
        >
          Signin
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
            formSpecs={signupFormSpecs}
            submit={this.submit}
            error={error}
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
    error: state.authenticationReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupAction: (credentials, resetForm, modalHandler) => {
      dispatch(
        actions.signupPostCredentials(credentials, resetForm, modalHandler)
      );
    }
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Signup);
