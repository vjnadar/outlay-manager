import React, { useContext, useCallback, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import FormFactory from "../../components/FormFactory/FormFactory";
import { resetPasswordRequestFormSpecs } from "./resetPasswordRequestFormSpecs";
import { ResetPasswordContext } from "../../contexts/contexts";
import Modal from "../../components/UI/Modal/Modal";

const ResetPasswordRequest = props => {
  const resetPasswordContext = useContext(ResetPasswordContext);
  const [modal, setModal] = useState(false);
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
      email: values.email
    };
    resetPasswordContext.resetPasswordRequest(body, modalHandler);
  }, []);
  const afterForm = (
    <>
      <Button tag={Link} to="/" color="info" className="mt-2">
        Go back
      </Button>
    </>
  );
  const errorModal = (
    <>
      <Modal header="Alert!" modal={modal} modalHandler={modalHandler}>
        <p>{modalMessage}</p>
        <Button onClick={modalHandler} outline color="info">
          OK
        </Button>
      </Modal>
    </>
  );
  return (
    <>
      {errorModal}
      <FormFactory
        formSpecs={resetPasswordRequestFormSpecs}
        submit={submit}
        afterForm={afterForm}
      />
    </>
  );
};
export default ResetPasswordRequest;
