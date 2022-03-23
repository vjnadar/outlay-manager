import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import configureStore from "../../store";
import { RootState } from "../../store/types";
import { CustomRouter } from "./CustomRouter";

type CustomRenderOptions = {
    preloadedState?: RootState;
    renderOptions?: Omit<RenderOptions, "wrapper">;
    routeHistory?: Array<string>;
    initialRouteIndex?: number;
};
type CustomRenderResult = RenderResult & { history: MemoryHistory };

function render(ui: JSX.Element, { preloadedState = {}, routeHistory, initialRouteIndex, ...renderOptions }: CustomRenderOptions): CustomRenderResult {
    const history = createMemoryHistory({ initialEntries: routeHistory, initialIndex: initialRouteIndex });
    const store = configureStore(preloadedState);
    function Wrapper({ children }: { children: ReactNode }): JSX.Element {
        return (
            <Provider store={store}>
                <CustomRouter history={history}>{children}</CustomRouter>
            </Provider>
        );
    }
    const view = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
    return {
        ...view,
        history
    };
}
export * from "@testing-library/react";
export { render };
