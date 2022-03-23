import { MemoryHistory } from "history";
import { ReactNode, useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

export function CustomRouter({ history, children }: { history: MemoryHistory; children: ReactNode }) {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router location={state.location} navigationType={state.action} navigator={history}>
            {children}
        </Router>
    );
}
