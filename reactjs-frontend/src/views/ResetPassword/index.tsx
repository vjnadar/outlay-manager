import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

import { FormFactory, Modal, Spinner } from "../../components";
import { Credentials } from "../../components/FormFactory/types";
import { resetPasswordSagaActionCreator } from "../../store/authentication/redux";
import { clearAll } from "../../store/general/redux";
import { RootState } from "../../store/types";
import { resetPasswordFormSpecs } from "./resetPasswordFormSpecs";

function ResetPassword() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const { successData } = useSelector((state: RootState) => state.authenticationReducer);
    const { error, loading } = useSelector((state: RootState) => state.authenticationReducer);
    const [isOpen, setIsOpen] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        dispatch(clearAll());
    }, []);
    useEffect(() => {
        switch (error?.message) {
            case "The token expired!":
                setResetSuccess(true);
                modalHandler("The token expired! Please try again.");
                break;
            case "The token is invalid!":
                setResetSuccess(true);
                modalHandler("The token is invalid! Try again.");
                break;
            case "Not a registered user account":
                modalHandler("This user does not have an account and should register!");
                break;
            case "The request did not have all the values.":
                modalHandler("Request did not have all the values necessary for this endpoint!");
                break;
            default:
                if (error?.type) modalHandler("Something went wrong. Try again later!");
                break;
        }
    }, [error]);
    useEffect(() => {
        if (successData) {
            setResetSuccess(true);
            modalHandler("Your password was changed successfully. Login with your new password.");
        }
    }, [successData]);
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function submit(values: Credentials) {
        const newPasswordObj = {
            password: values.password as string,
            token
        };
        dispatch(resetPasswordSagaActionCreator({ newPasswordObj }));
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
                    submit={(values: Credentials) => {
                        submit(values);
                    }}
                />
            )}
        </>
    );
}
export default ResetPassword;
