import { ValidatorTextboxProps } from "./types";

import "./ValidatorTextbox.scss";
function ValidatorTextbox({ formProps, fieldName }: ValidatorTextboxProps) {
    return (
        <>
            <input
                type="text"
                name={fieldName}
                id="square-textbox"
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                value={formProps.values[fieldName]?.toString()}
            />
        </>
    );
}
export default ValidatorTextbox;
