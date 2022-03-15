import "./Signin.scss";

import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Alert, Button } from "reactstrap";

import Form from "../../components/FormFactory";
import { Credentials } from "../../components/FormFactory/types";
import { Modal, Spinner } from "../../components/ui";
import * as actions from "../../store/authentication/redux";
import { RootState } from "../../store/types";
import { signinFormSpecs } from "./signinFormSpecs";

function Signin(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [modalMessage, setModalMessage] = useState("");
    const { message: logoutMessage, error, loading } = useSelector((state: RootState) => state.authenticationReducer);
    const navigate = useNavigate();
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function submit(credentials: Credentials) {
        const { signinSagaActionCreator } = actions;
        dispatch(signinSagaActionCreator({ credentials, modalHandler }));
    }
    function navigateTo(event: MouseEvent<HTMLButtonElement>) {
        if ((event.target as HTMLInputElement).name === "signup") {
            navigate("signup");
        } else {
            window.location.reload();
        }
    }
    let content = null;
    let beforeForm;
    if (logoutMessage) {
        beforeForm = (
            <Alert className="alert" color="warning">
                {logoutMessage}
            </Alert>
        );
    } else {
        beforeForm = undefined;
    }
    const afterForm = (
        <>
            <small className="smallText">Don`t have an account? Sign up in no time.</small>
            <Button
                name="signup"
                color="success"
                type="button"
                className="signupNav"
                onClick={(event) => {
                    navigateTo(event);
                }}
            >
                Sign Up
            </Button>
        </>
    );
    const errorModal = (
        <Modal
            header="Alert!"
            isOpen={isOpen}
            modalHandler={(message?: string) => {
                modalHandler(message);
            }}
        >
            {error && error.type === "serverError" ? (
                <>
                    <p>Sorry. Something went wrong. Please try again later.</p>
                    <Button
                        name="goBack"
                        onClick={(event) => {
                            navigateTo(event);
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
    if (loading) {
        content = <Spinner />;
    } else {
        content = <Form formSpecs={signinFormSpecs} submit={(credentials: Credentials) => submit(credentials)} beforeForm={beforeForm} afterForm={afterForm} />;
    }
    if (error && error.type === "serverError") {
        content = null;
    }
    return (
        <>
            {errorModal}
            {content}
        </>
    );
}
export default Signin;
