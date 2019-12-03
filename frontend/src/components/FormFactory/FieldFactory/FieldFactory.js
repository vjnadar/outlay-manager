import React from "react";

const fieldFactory = props => {
  return (
    <>
      {props.inputFields.map(field => (
        <React.Fragment key={field.name}>
          {field.type === "checkbox" ? (
            <React.Fragment>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                onChange={props.formProps.handleChange}
                onBlur={props.formProps.handleBlur}
                checked={props.formProps.values[field.name]}
              />
            </React.Fragment>
          ) : field.type === "radio" ? (
            <React.Fragment>
              <label htmlFor={field.name}>
                {field.label}
                <input
                  id={field.label}
                  type={field.type}
                  name={field.name}
                  onChange={props.formProps.handleChange}
                  onBlur={props.formProps.handleBlur}
                  value={field.radioValue}
                  checked={
                    props.formProps.values[field.name] === field.radioValue
                  }
                />
              </label>
            </React.Fragment>
          ) : field.type === "select" ? (
            <React.Fragment>
              <label htmlFor={field.name}>{field.label}</label>
              <select
                id={field.name}
                name={field.name}
                onChange={props.formProps.handleChange}
                onBlur={props.formProps.handleBlur}
                value={props.formProps.values[field.name]}
              >
                {field.options.map(opt => (
                  <>
                    <option value={opt.value}>{opt.displayValue}</option>
                  </>
                ))}
              </select>
            </React.Fragment>
          ) : field.type === "formtext" ? (
            <React.Fragment>
              <small>{field.text}</small>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                onChange={props.formProps.handleChange}
                onBlur={props.formProps.handleBlur}
                value={props.formProps.values[field.name]}
              />
              {props.formProps.errors[field.name] &&
                props.formProps.touched[field.name] && (
                  <small className="formErrors">
                    {props.formProps.errors[field.name]}
                  </small>
                )}
            </React.Fragment>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
export default fieldFactory;
