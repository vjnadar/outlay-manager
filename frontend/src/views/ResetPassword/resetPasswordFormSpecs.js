export const resetPasswordFormSpecs = {
  title: "Reset Password",
  inputFields: [
    {
      type: "password",
      name: "password",
      label: "New Password",
      initialValue: "",
      validation: {
        type: "password",
        minPasswordLenMessage: "The password must be atleast 4 letters long.",
        requiredMessage: "This field is required and must be filled.",
        min: 4
      }
    },
    {
      type: "password",
      name: "cpassword",
      label: "Confirm Password ",
      initialValue: "",
      validation: {
        type: "confirmpassword",
        secondField: "password",
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
