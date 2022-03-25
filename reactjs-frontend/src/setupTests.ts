import "@testing-library/jest-dom";

import { server } from "./testUtils/mocks/server";

beforeAll(() => {
    server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
