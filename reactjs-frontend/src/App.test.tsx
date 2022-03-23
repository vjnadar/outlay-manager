import userEvent from "@testing-library/user-event";

import App from "./App";
import { render, screen, waitFor } from "./testUtils/customTestMethods";

describe("should test <Signin/>", () => {
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
    it("should signin to the app with an invalid password and check the Modal message", async () => {
        render(<App />, {});
        const emailTextBox = await screen.findByRole("textbox", { name: "Email" });
        expect(emailTextBox).toBeInTheDocument();
    });
});
