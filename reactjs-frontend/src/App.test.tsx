import userEvent from "@testing-library/user-event";

import App from "./App";
import { render, screen } from "./testUtils/customTestMethods";

describe("should test <Signin/>", () => {
    afterEach(() => {
        localStorage.clear();
    });
    it("should signin to the app", async () => {
        render(<App />, {});
        const emailTextBox = await screen.findByRole("textbox", { name: "Email" });
        expect(emailTextBox).toBeInTheDocument();
        const passwordTextBox = await screen.findByLabelText("Password");
        expect(passwordTextBox).toBeInTheDocument();
        userEvent.type(emailTextBox, "abc@abc.com");
        userEvent.type(passwordTextBox, "abcdefg");
        const submitBtn = await screen.findByRole("button", { name: "Sign In" });
        userEvent.click(submitBtn);
        const heading = await screen.findByRole("heading", { name: /No entry from this date. Want to add something?/i });
        expect(heading).toBeInTheDocument();
    });
    it("should signin to the app with an invalid email and check the Modal message", async () => {
        render(<App />, {});
        const emailTextBox = await screen.findByRole("textbox", { name: "Email" });
        expect(emailTextBox).toBeInTheDocument();
        const passwordTextBox = await screen.findByLabelText("Password");
        expect(passwordTextBox).toBeInTheDocument();
        userEvent.type(emailTextBox, "abc@abc.co");
        userEvent.type(passwordTextBox, "abcdefg");
        const submitBtn = await screen.findByRole("button", { name: "Sign In" });
        userEvent.click(submitBtn);
        const errorText = await screen.findByText(/The account for this email id doesnt exist. Please sign up!/i);
        expect(errorText).toBeInTheDocument();
    });
    it("should signin to the app with an invalid password and check the Modal message", async () => {
        render(<App />, {});
        const emailTextBox = await screen.findByRole("textbox", { name: "Email" });
        expect(emailTextBox).toBeInTheDocument();
        const passwordTextBox = await screen.findByLabelText("Password");
        expect(passwordTextBox).toBeInTheDocument();
        userEvent.type(emailTextBox, "abc@abc.com");
        userEvent.type(passwordTextBox, "abcdef");
        const submitBtn = await screen.findByRole("button", { name: "Sign In" });
        userEvent.click(submitBtn);
        const errorText = await screen.findByText(/The entered password is invalid!/i);
        expect(errorText).toBeInTheDocument();
    });
});
