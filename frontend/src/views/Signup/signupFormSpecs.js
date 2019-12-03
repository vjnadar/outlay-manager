export const signupFormSpecs = {
  title: "Sign Up",
  inputFields: [
    {
      type: "text",
      name: "fullName",
      label: "Full name",
      initialValue: "",
      validation: {
        type: "text",
        requiredMessage: "This field is required and must be filled."
      }
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      initialValue: "",
      validation: {
        type: "email",
        invalidEmailMessage: "Please enter a valid email.",
        requiredMessage: "This field is required and must be filled."
      }
    },
    {
      type: "password",
      name: "password",
      label: "Password ",
      initialValue: "",
      validation: {
        type: "password",
        minPasswordLenMessage: "The password must be atleast 4 letters long.",
        requiredMessage: "This field is required and must be filled.",
        min: 4
      }
    }
  ],
  buttons: {
    buttonSet: {
      setType: "default",
      buttonNames: {
        OK: "Sign Up",
        Cancel: "Cancel"
      }
    }
  }
};
