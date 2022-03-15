import { ButtonTypes } from "../../components/FormFactory/ButtonFactory/enums";
import { FieldTypes } from "../../components/FormFactory/enums";
import { FormSpecification } from "../../components/FormFactory/types";

export const resetPasswordRequestFormSpecs: FormSpecification = {
    title: "Reset Password",
    inputFields: [
        {
            type: FieldTypes.Email,
            name: "email",
            label: "Please enter your email address to reset your account's password.",
            initialValue: "",
            validation: {
                type: FieldTypes.Email,
                invalidEmailMessage: "Please enter a valid email.",
                requiredMessage: "This field is required and must be filled."
            }
        }
    ],
    buttons: {
        buttonSet: {
            setType: ButtonTypes.Default,
            buttonNames: {
                ok: "Submit",
                cancel: "Cancel"
            }
        }
    }
};
