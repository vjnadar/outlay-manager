import "./Signup.scss";

import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import { FormFactory, Modal, Spinner } from "../../components";
import { Credentials } from "../../components/FormFactory/types";
import * as actions from "../../store/authentication/redux";
import { clearAll } from "../../store/general/redux";
import { RootState } from "../../store/types";
import { signupFormSpecs } from "./signupFormSpecs";

function Signup(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [modalMessage, setModalMessage] = useState("");
    const { error, loading, successData } = useSelector((state: RootState) => state.authenticationReducer);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(clearAll());
    });
    useEffect(() => {
        switch (error?.message) {
            case "Missing credentials":
                modalHandler("Please fill in all the details");
                break;
            case "The user account already exists":
                modalHandler("The user account already exists! Use a different email id.");
                break;
            default:
                if (error?.type === "serverError") modalHandler("Something went wrong. Try again later!");
                break;
        }
    }, [error]);
    useEffect(() => {
        if (successData) {
            modalHandler("The registration was successful! Go back to the sign in page and just sign in!");
        }
    }, [successData]);
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function submit(credentials: Credentials) {
        const { signupSagaActionCreator } = actions;
        dispatch(signupSagaActionCreator({ credentials }));
    }
    function navigateTo(event: MouseEvent<HTMLButtonElement>) {
        if ((event.target as HTMLInputElement).name === "signin") {
            navigate("/signin");
        } else {
            window.location.reload();
        }
    }
    let content = null;
    const afterForm = (
        <>
            <small className="smallText">Already have an account? Sign in.</small>
            <Button
                name="signin"
                color="success"
                type="button"
                className="signinNav"
                onClick={(event) => {
                    navigateTo(event);
                }}
            >
                Signin
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
                            navigate("/signin");
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
        content = <FormFactory formSpecs={signupFormSpecs} submit={(credentials: Credentials) => submit(credentials)} afterForm={afterForm} />;
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

export default Signup;
