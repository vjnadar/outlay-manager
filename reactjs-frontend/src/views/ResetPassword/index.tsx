import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

import FormFactory from "../../components/FormFactory";
import { Credentials } from "../../components/FormFactory/types";
import { Modal, Spinner } from "../../components/ui";
import { resetPasswordSagaActionCreator } from "../../store/authentication/redux";
import { RootState } from "../../store/types";
import { resetPasswordFormSpecs } from "./resetPasswordFormSpecs";

function ResetPassword() {
    const { token } = useParams();
    const { error, loading } = useSelector((state: RootState) => state.authenticationReducer);
    const [isOpen, setIsOpen] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function submit(values: Credentials) {
        const newPasswordObj = {
            password: values.password as string,
            token
        };
        resetPasswordSagaActionCreator({ newPasswordObj, modalHandler, setResetSuccess });
    }
    function reload() {
        window.location.reload();
    }
    const afterForm = (
        <Button tag={Link} to="/" color="success" className="mt-2">
            Go back to Sign In Page
        </Button>
    );
    const errorModal = (
        <Modal
            header="Alert!"
            isOpen={isOpen}
            modalHandler={(message?: string) => {
                modalHandler(message);
            }}
            backdrop={resetSuccess || (error && error.type === "serverError") ? "static" : false}
        >
            <p>{modalMessage}</p>
            {/* eslint no-nested-ternary: 0 */}
            {!resetSuccess && !(error && error.type === "serverError") ? (
                <Button
                    onClick={() => {
                        modalHandler();
                    }}
                    outline
                    color="info"
                >
                    OK
                </Button>
            ) : !resetSuccess && error && error.type === "serverError" ? (
                <Button
                    onClick={() => {
                        reload();
                    }}
                    outline
                    color="info"
                >
                    Try again
                </Button>
            ) : (
                <Button tag={Link} to="/" outline color="info">
                    OK
                </Button>
            )}
        </Modal>
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
                    submit={(values) => {
                        submit(values);
                    }}
                />
            )}
        </>
    );
}
export default ResetPassword;
