import { rest } from "msw";

import { getDateEntry, getTotal, signinSuccessData } from "../../fakeData";

export const handlers = [
    rest.post("/authentication/signin", (req, res, ctx) => {
        const { email, password } = req.body as { email: string; password: string };
        const correctEmail = "abc@abc.com";
        const correctPassword = "abcdefg";
        if (correctEmail !== email) {
            return res(ctx.status(401), ctx.json({ message: "This user does not have an account and should register!" }));
        }
        if (correctPassword !== password) {
            return res(ctx.status(401), ctx.json({ message: "The entered password is invalid!" }));
        }
        return res(ctx.json(signinSuccessData));
    }),
    rest.get("/main/getDateData/:date", (req, res, ctx) => {
        return res(ctx.json(getDateEntry));
    }),
    rest.get("/main/getTotal/", (req, res, ctx) => {
        return res(ctx.json(getTotal));
    })
];
