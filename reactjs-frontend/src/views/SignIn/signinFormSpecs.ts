import { ButtonTypes } from "../../components/FormFactory/ButtonFactory/enums";
import { FieldTypes } from "../../components/FormFactory/enums";
import { FormSpecification } from "../../components/FormFactory/types";

export const signinFormSpecs: FormSpecification = {
    title: "Sign In",
    inputFields: [
        {
            type: FieldTypes.Email,
            name: "email",
            label: "Email",
            initialValue: "",
            validation: {
                type: FieldTypes.Email,
                invalidEmailMessage: "Please enter a valid email.",
                requiredMessage: "This field is required and must be filled."
            }
        },
        {
            type: FieldTypes.Password,
            name: "password",
            label: "Password ",
            initialValue: "",
            validation: {
                type: FieldTypes.Password,
                minimumPasswordLengthMessage: "The password must be atleast 4 letters long.",
                requiredMessage: "This field is required and must be filled.",
                minimum: 4
            }
        },
        {
            type: FieldTypes.Link,
            name: "link",
            label: "Forgot your password? Click here.",
            to: "/resetPasswordRequest"
        }
    ],
    buttons: {
        buttonSet: {
            setType: ButtonTypes.Default,
            buttonNames: {
                ok: "Sign In",
                cancel: "Cancel"
            }
        }
    }
};
