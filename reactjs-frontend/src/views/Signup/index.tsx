import "./Signup.scss";

import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "reactstrap";

import Form from "../../components/FormFactory";
import { Credentials } from "../../components/FormFactory/types";
import { Modal, Spinner } from "../../components/ui";
import * as actions from "../../store/authentication/redux";
import { RootState } from "../../store/types";
import { signupFormSpecs } from "./signupFormSpecs";

function Signup(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [modalMessage, setModalMessage] = useState("");
    const { error, loading } = useSelector((state: RootState) => state.authenticationReducer);
    const navigate = useNavigate();
    function modalHandler(message?: string) {
        setIsOpen(!isOpen);
        if (message) setModalMessage(message);
    }
    function submit(credentials: Credentials) {
        const { signupSagaActionCreator } = actions;
        dispatch(signupSagaActionCreator({ credentials, modalHandler }));
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
        content = <Form formSpecs={signupFormSpecs} submit={(credentials: Credentials) => submit(credentials)} afterForm={afterForm} />;
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
