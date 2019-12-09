export const resetPasswordRequestFormSpecs = {
  title: "Reset Password",
  inputFields: [
    {
      type: "text",
      name: "email",
      label:
        "Please enter your email address to reset your account's password.",
      initialValue: "",
      validation: {
        type: "email",
        invalidEmailMessage: "Please enter a valid email.",
        requiredMessage: "This field is required and must be filled."
      }
    }
  ],
  buttons: {
    buttonSet: {
      setType: "default",
      buttonNames: {
        OK: "Submit",
        Cancel: "Cancel"
      }
    }
  }
};
