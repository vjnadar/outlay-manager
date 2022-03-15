import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import FormFactory from "../../components/FormFactory";
import { Credentials } from "../../components/FormFactory/types";
import { Modal, Spinner } from "../../components/ui";
import { resetPasswordRequestActionCreator } from "../../store/authentication/redux";
import { RootState } from "../../store/types";
import { resetPasswordRequestFormSpecs } from "./resetPasswordRequestFormSpecs";

function ResetPasswordRequest(): JSX.Element {
    const { loading, error } = useSelector((state: RootState) => state.authenticationReducer);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function reload() {
        window.location.reload();
    }
    function submit(values: Credentials) {
        const resetPasswordRequestSubmitObj = {
            email: values.email as string
        };
        dispatch(resetPasswordRequestActionCreator({ resetPasswordRequestSubmitObj, modalHandler }));
    }
    const afterForm = (
        <Button tag={Link} to="/" color="info" className="mt-2">
            Go back
        </Button>
    );
    const messageModal = (
        <Modal
            header="Alert!"
            isOpen={isOpen}
            modalHandler={() => {
                modalHandler();
            }}
            backdrop={error && error.type === "serverError" ? "static" : false}
        >
            {error && error.type === "serverError" ? (
                <>
                    <p>Sorry. Something went wrong. Please try again later.</p>
                    <Button
                        name="goBack"
                        onClick={() => {
                            reload();
                        }}
                        outline
                        color="info"
                    >
                        Try Again
                    </Button>
                </>
            ) : (
                <>
                    <p>{modalMessage}</p>
                    <Button
                        onClick={() => {
                            modalHandler();
                        }}
                        outline
                        color="info"
                    >
                        OK
                    </Button>
                </>
            )}
        </Modal>
    );
    return (
        <>
            {messageModal}
            {loading ? (
                <Spinner />
            ) : (
                <FormFactory
                    formSpecs={resetPasswordRequestFormSpecs}
                    submit={(values) => {
                        submit(values);
                    }}
                    afterForm={afterForm}
                />
            )}
        </>
    );
}
export default ResetPasswordRequest;
