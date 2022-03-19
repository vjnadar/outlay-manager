import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { FormFactory, Modal, Spinner } from "../../components";
import { Credentials } from "../../components/FormFactory/types";
import { resetPasswordRequestActionCreator } from "../../store/authentication/redux";
import { clearAll } from "../../store/general/redux";
import { RootState } from "../../store/types";
import { resetPasswordRequestFormSpecs } from "./resetPasswordRequestFormSpecs";

function ResetPasswordRequest(): JSX.Element {
    const { loading, error, successData } = useSelector((state: RootState) => state.authenticationReducer);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        dispatch(clearAll());
    }, []);
    useEffect(() => {
        switch (error?.message) {
            case "Not a registered user account":
                modalHandler("This user does not have an account and should register!");
                break;
            case "A mail was already sent.":
                modalHandler("A mail was already sent! Please check your email account!");
                break;
            case "The request did not have all the values.":
                modalHandler("Enter your email!");
                break;
            default:
                if (error?.type === "serverError") modalHandler("Something went wrong. Try again later!");
                break;
        }
    }, [error]);
    useEffect(() => {
        if (successData) modalHandler("We sent a mail to your registered email account. Please check your mail.");
    }, [successData]);
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
        dispatch(resetPasswordRequestActionCreator({ resetPasswordRequestSubmitObj }));
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
                    submit={(values: Credentials) => {
                        submit(values);
                    }}
                    afterForm={afterForm}
                />
            )}
        </>
    );
}
export default ResetPasswordRequest;
