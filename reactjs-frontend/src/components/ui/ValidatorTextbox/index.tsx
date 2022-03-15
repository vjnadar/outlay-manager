import "./ValidatorTextbox.scss";

import { ValidatorTextboxProps } from "./types";

function ValidatorTextbox({ formProps, fieldName }: ValidatorTextboxProps) {
    return (
        <input
            type="text"
            name={fieldName}
            id="square-textbox"
            onChange={formProps.handleChange}
            onBlur={formProps.handleBlur}
            value={formProps.values[fieldName]?.toString()}
        />
    );
}
export default ValidatorTextbox;
