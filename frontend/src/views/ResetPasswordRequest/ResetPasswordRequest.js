import React, { useContext, useCallback, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import FormFactory from "../../components/FormFactory/FormFactory";
import Spinner from "../../components/UI/Spinner/Spinner";
import { resetPasswordRequestFormSpecs } from "./resetPasswordRequestFormSpecs";
import { ResetPasswordContext } from "../../contexts/contexts";
import Modal from "../../components/UI/Modal/Modal";

const ResetPasswordRequest = (props) => {
  const { resetPasswordRequest, loading, error } = useContext(
    ResetPasswordContext
  );
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalHandler = useCallback((message) => {
    setModal((prevModalValue) => {
      return !prevModalValue;
    });
    setModalMessage((prevModalMessage) => {
      return prevModalMessage === "" ? message : "";
    });
  }, []);
  const navigateTo = () => {
    window.location.reload();
  };
  const submit = useCallback(
    (values) => {
      const body = {
        email: values.email,
      };
      resetPasswordRequest(body, modalHandler);
    },
    [modalHandler, resetPasswordRequest]
  );
  const afterForm = (
    <>
      <Button tag={Link} to="/" color="info" className="mt-2">
        Go back
      </Button>
    </>
  );
  const messageModal = (
    <>
      <Modal
        header="Alert!"
        modal={modal}
        modalHandler={modalHandler}
        backdrop={error && error.type === "serverError" ? "static" : false}
      >
        {error && error.type === "serverError" ? (
          <>
            <p>Sorry. Something went wrong. Please try again later.</p>
            <Button name="goBack" onClick={navigateTo} outline color="info">
              Try Again
            </Button>
          </>
        ) : (
          <>
            <p>{modalMessage}</p>
            <Button onClick={modalHandler} outline color="info">
              OK
            </Button>
          </>
        )}
      </Modal>
    </>
  );
  return (
    <>
      {messageModal}
      {loading ? (
        <Spinner />
      ) : (
        <FormFactory
          formSpecs={resetPasswordRequestFormSpecs}
          submit={submit}
          afterForm={afterForm}
        />
      )}
    </>
  );
};
export default ResetPasswordRequest;
