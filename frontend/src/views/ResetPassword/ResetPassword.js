import React, { useContext, useCallback, useState } from "react";
import { Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

import FormFactory from "../../components/FormFactory/FormFactory";
import { resetPasswordFormSpecs } from "./resetPasswordFormSpecs";
import { ResetPasswordContext } from "../../contexts/contexts";
import Modal from "../../components/UI/Modal/Modal";

const ResetPassword = props => {
  const resetPasswordContext = useContext(ResetPasswordContext);
  const token = props.match.params && props.match.params.token;
  const [modal, setModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalHandler = useCallback(
    message => {
      setModal(prevModalValue => {
        return !prevModalValue;
      });
      setModalMessage(prevModalMessage => {
        return prevModalMessage === "" ? message : "";
      });
    },
    [modal, modalMessage]
  );
  const submit = useCallback(values => {
    const body = {
      password: values.password,
      token: token
    };
    resetPasswordContext.resetPassword(body, modalHandler, setResetSuccess);
  }, []);

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
        backdrop={resetSuccess ? "static" : false}
      >
        <p>{modalMessage}</p>
        {!setResetSuccess ? (
          <Button onClick={modalHandler} outline color="info">
            OK
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
      <FormFactory
        formSpecs={resetPasswordFormSpecs}
        afterForm={afterForm}
        submit={submit}
      />
    </>
  );
};

export default withRouter(ResetPassword);
