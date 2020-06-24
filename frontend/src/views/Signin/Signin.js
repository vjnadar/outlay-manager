import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button } from "reactstrap";

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
      modalMessage: "",
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    this._mounted = true;
  }

  modalHandler = (message) => {
    this.setState((prevState) => {
      return {
        modal: !prevState.modal,
        modalMessage: prevState.modalMessage === "" ? message : "",
      };
    });
  };
  submit(credentials) {
    const { signinAction } = this.props;
    signinAction(credentials, this.modalHandler);
  }

  navigateTo = (event) => {
    if (event.target.name === "signup") {
      this.props.history.push("/signup");
    } else {
      window.location.reload();
    }
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
          name="signup"
          color="success"
          type="button"
          className="signupNav"
          onClick={(event) => {
            this.navigateTo(event);
          }}
        >
          Sign Up
        </Button>
      </>
    );
    const errorModal = (
      <>
        <Modal header="Alert!" modal={modal} modalHandler={this.modalHandler}>
          {error && error.type === "serverError" ? (
            <>
              <p>Sorry. Something went wrong. Please try again later.</p>
              <Button
                name="goBack"
                onClick={(event) => {
                  this.navigateTo(event);
                }}
                outline
                color="info"
              >
                Go back
              </Button>
            </>
          ) : (
            <>
              <p>{modalMessage}</p>
              <Button onClick={this.modalHandler} outline color="info">
                OK
              </Button>
            </>
          )}
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
      content = <></>;
    }
    return (
      <>
        {errorModal}
        {content}
      </>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    loading: state.authenticationReducer.loading,
    logoutMessage: state.authenticationReducer.message,
    error: state.authenticationReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signinAction: (credentials, modalHandler) => {
      dispatch(actions.signinPostCredentials(credentials, modalHandler));
    },
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(Signin);
