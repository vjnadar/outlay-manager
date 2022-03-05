import { ButtonTypes } from "../../components/FormFactory/ButtonFactory/enums";
import { FieldTypes } from "../../components/FormFactory/enums";
import { FormSpecification } from "../../components/FormFactory/types";

export const resetPasswordFormSpecs: FormSpecification = {
    title: "Reset Password",
    inputFields: [
        {
            type: FieldTypes.Password,
            name: "password",
            label: "New Password",
            initialValue: "",
            validation: {
                type: FieldTypes.Password,
                minimumPasswordLengthMessage: "The password must be atleast 4 letters long.",
                requiredMessage: "This field is required and must be filled.",
                minimum: 4
            }
        },
        {
            type: FieldTypes.Password,
            name: "cpassword",
            label: "Confirm Password ",
            initialValue: "",
            validation: {
                type: FieldTypes.ConfirmPassword,
                secondField: "password",
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
