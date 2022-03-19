import "./Signin.scss";

import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Alert, Button } from "reactstrap";

import { FormFactory, Modal, Spinner } from "../../components";
import { Credentials } from "../../components/FormFactory/types";
import * as actions from "../../store/authentication/redux";
import { clearAll } from "../../store/general/redux";
import { RootState } from "../../store/types";
import { signinFormSpecs } from "./signinFormSpecs";

function Signin(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [modalMessage, setModalMessage] = useState("");
    const { message: logoutMessage, error, loading } = useSelector((state: RootState) => state.authenticationReducer);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(clearAll());
    }, []);
    useEffect(() => {
        switch (error?.message) {
            case "Missing credentials":
                modalHandler("Please fill in all the details");
                break;
            case "This user does not have an account!":
                modalHandler("The account for this email id doesnt exist. Please sign up!");
                break;
            case "The entered password is invalid!":
                modalHandler("The entered password is invalid!");
                break;
            default:
                if (error?.type === "serverError") {
                    modalHandler("Something went wrong. Try again later!");
                }
                break;
        }
    }, [error]);
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function submit(credentials: Credentials) {
        const { signinSagaActionCreator } = actions;
        dispatch(signinSagaActionCreator({ credentials }));
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
        content = (
            <FormFactory formSpecs={signinFormSpecs} submit={(credentials: Credentials) => submit(credentials)} beforeForm={beforeForm} afterForm={afterForm} />
        );
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
