import Avatar from "@material-ui/core/Avatar";
import { ChangeEvent, createRef, Fragment, memo } from "react";
import { Link } from "react-router-dom";

import ValidatorTextbox from "../../ui/ValidatorTextbox";
import { FieldTypes } from "../enums";
import { RadioButtonOption, SelectBoxOption, ValidatorTextValues } from "../types";
import { FieldFactoryProps } from "./types";

function FieldFactory({ formProps, inputFields }: FieldFactoryProps): JSX.Element {
    const fileInput = createRef<HTMLInputElement>();
    function getFileName(event: ChangeEvent<HTMLInputElement>): string {
        if (event.currentTarget.files) {
            return event.currentTarget.files[0].name;
        }
        return "";
    }
    return (
        <>
            {inputFields.map((field) => (
                <Fragment key={`${field.name}`}>
                    {field.type === FieldTypes.Checkbox ? (
                        <>
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    name={field.name}
                                    value={field.checkValue}
                                    onChange={formProps.handleChange}
                                    onBlur={formProps.handleBlur}
                                    checked={formProps.values[field.name] as boolean | undefined}
                                />
                                &nbsp;
                                <label htmlFor={field.name}>
                                    <span> {field.label}</span>
                                </label>
                            </div>
                            {formProps.errors[field.name] && formProps.touched[field.name] && (
                                <small className="formErrors">{formProps.errors[field.name]}</small>
                            )}
                        </>
                    ) : field.type === FieldTypes.RadioButtonSet ? (
                        <>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>{field.legend}</label>
                            <span className="radio-container">
                                {field?.radioButtonOptions?.map((option: RadioButtonOption) => (
                                    <Fragment key={option.label}>
                                        <label htmlFor={option.label}>{option.label}</label>
                                        <input
                                            id={option.label}
                                            type={option.type}
                                            name={option.name}
                                            onChange={formProps.handleChange}
                                            onBlur={formProps.handleBlur}
                                            value={option.radioValue}
                                            checked={formProps.values[option.name] === option.radioValue}
                                        />
                                    </Fragment>
                                ))}
                            </span>
                            <div>
                                {formProps.errors[field.name] && formProps.touched[field.name] && (
                                    <small className="formErrors">{formProps.errors[field.name]}</small>
                                )}
                            </div>
                        </>
                    ) : field.type === FieldTypes.Select ? (
                        <>
                            <label htmlFor={field.name}>{field.label}</label>
                            <select
                                id={field.name}
                                name={field.name}
                                onChange={formProps.handleChange}
                                onBlur={formProps.handleBlur}
                                value={formProps.values[field.name]?.toString()}
                            >
                                {field?.selectBoxOptions?.map((opt: SelectBoxOption) => (
                                    <Fragment key={opt.displayValue}>
                                        <option value={opt.value}>{opt.displayValue}</option>
                                    </Fragment>
                                ))}
                            </select>
                            {formProps.errors[field.name] && formProps.touched[field.name] && (
                                <small className="formErrors">{formProps.errors[field.name]}</small>
                            )}
                        </>
                    ) : field.type === FieldTypes.FormText ? (
                        <small>{field.text}</small>
                    ) : field.type === FieldTypes?.Link ? (
                        <Link to={field.to ?? ""} className="formLink">
                            {field?.label}
                        </Link>
                    ) : field.type === FieldTypes.CustomImageUpload ? (
                        <>
                            <span className="file-box">
                                <ul
                                    role="menu"
                                    className="container"
                                    onClick={() => {
                                        if (fileInput.current) {
                                            fileInput.current.click();
                                        }
                                    }}
                                    onKeyPress={() => {
                                        if (fileInput.current) {
                                            fileInput.current.click();
                                        }
                                    }}
                                >
                                    <li>
                                        <Avatar alt="Company_Logo" src="/static/images/companyLogo.PNG" />
                                    </li>
                                    &nbsp;
                                    <li>
                                        <span> Upload Your Company Logo</span>
                                    </li>
                                </ul>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    hidden
                                    type="file"
                                    onChange={(event) => {
                                        formProps.setFieldValue(field.name, getFileName(event));
                                    }}
                                    ref={fileInput}
                                />
                            </span>
                            <div>
                                {formProps.errors[field.name] && formProps.touched[field.name] && (
                                    <small className="formErrors">{formProps.errors[field.name]}</small>
                                )}
                            </div>
                        </>
                    ) : field.type === FieldTypes.ValidatorTextbox ? (
                        <>
                            <legend>{field.legend}</legend>
                            <div className="textbox-container">
                                {field?.values?.map((textBox: ValidatorTextValues) => (
                                    <Fragment key={textBox.name}>
                                        {" "}
                                        <ValidatorTextbox formProps={formProps} fieldName={textBox.name} />
                                    </Fragment>
                                ))}
                            </div>
                            <div>
                                {!formProps.isValid ? (
                                    <small className="formErrors">
                                        Please enter a valid <b>5 digit code</b>.
                                    </small>
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <Fragment key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={formProps.handleChange}
                                onBlur={formProps.handleBlur}
                                value={formProps.values[field.name]?.toString()}
                            />
                            {formProps.errors[field.name] && formProps.touched[field.name] && (
                                <small className="formErrors">{formProps.errors[field.name]}</small>
                            )}
                        </Fragment>
                    )}
                </Fragment>
            ))}
        </>
    );
}
export default memo(FieldFactory);
