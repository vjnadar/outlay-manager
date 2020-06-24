import React, { useContext, useCallback, useState } from "react";
import { Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

import FormFactory from "../../components/FormFactory/FormFactory";
import { resetPasswordFormSpecs } from "./resetPasswordFormSpecs";
import { ResetPasswordContext } from "../../contexts/contexts";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";

const ResetPassword = (props) => {
  const { resetPassword, error, loading } = useContext(ResetPasswordContext);
  const token = props.match.params && props.match.params.token;
  const [modal, setModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalHandler = useCallback(
    (message) => {
      setModal((prevModalValue) => {
        return !prevModalValue;
      });
      setModalMessage((prevModalMessage) => {
        return prevModalMessage === "" ? message : "";
      });
    },
    [modal, modalMessage]
  );
  const submit = useCallback((values) => {
    const body = {
      password: values.password,
      token: token,
    };
    resetPassword(body, modalHandler, setResetSuccess);
  }, []);
  const navigateTo = useCallback(() => {
    window.location.reload();
  });

  const afterForm = (
    <>
      <Button tag={Link} to="/" color="success" className="mt-2">
        Go back to Sign In Page
      </Button>
    </>
  );
  const errorModal = (
    <>
      <Modal
        header="Alert!"
        modal={modal}
        modalHandler={modalHandler}
        backdrop={
          resetSuccess || (error && error.type === "serverError")
            ? "static"
            : false
        }
      >
        <p>{modalMessage}</p>
        {!resetSuccess && !(error && error.type === "serverError") ? (
          <Button onClick={modalHandler} outline color="info">
            OK
          </Button>
        ) : !resetSuccess && error && error.type === "serverError" ? (
          <Button onClick={navigateTo} outline color="info">
            Try again
          </Button>
        ) : (
          <Button tag={Link} to="/" outline color="info">
            OK
          </Button>
        )}
      </Modal>
    </>
  );
  return (
    <>
      {errorModal}
      {loading ? (
        <Spinner />
      ) : (
        <FormFactory
          formSpecs={resetPasswordFormSpecs}
          afterForm={afterForm}
          submit={submit}
        />
      )}
    </>
  );
};

export default withRouter(ResetPassword);
