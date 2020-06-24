import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
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

  modalHandler = (message) => {
    this.setState((prevState) => {
      return {
        modal: !prevState.modal,
        modalMessage: prevState.modalMessage === "" ? message : "",
      };
    });
  };

  submit(credentials) {
    const { signupAction } = this.props;
    signupAction(credentials, this.modalHandler);
  }

  navigateTo = (event) => {
    if (event.target.name === "signin") {
      this.props.history.push("/");
    } else {
      window.location.reload();
    }
  };

  render() {
    const { error, loading } = this.props;
    const { modal, modalMessage } = this.state;
    let content = <></>;
    const afterForm = (
      <>
        <small className="smallText">Already have an account? Sign in.</small>
        <Button
          name="signin"
          color="success"
          type="button"
          className="signinNav"
          onClick={(event) => {
            this.navigateTo(event);
          }}
        >
          Signin
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
            formSpecs={signupFormSpecs}
            submit={this.submit}
            error={error}
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
    error: state.authenticationReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupAction: (credentials, modalHandler) => {
      dispatch(actions.signupPostCredentials(credentials, modalHandler));
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Signup);
