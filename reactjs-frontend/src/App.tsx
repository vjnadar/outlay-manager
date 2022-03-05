import { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Layout, Spinner } from "./components";
import { AppContext } from "./contexts";
import { AppContextType } from "./contexts/types";
import { RouteLock } from "./hoc";
import { landingPageRoutes, mainAppRoutes } from "./routes";
import * as actions from "./store/authentication/redux";
import { RootState } from "./store/types";

function App(): JSX.Element {
    const [routeLock, setRouteLock] = useState<boolean>(true);
    const { token } = useSelector((state: RootState) => state.authenticationReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const { automaticLogoutSagaActionCreator } = actions;
        dispatch(automaticLogoutSagaActionCreator());
    }, [dispatch]);
    const appContext = useMemo<AppContextType>(
        () => ({
            setRouteLock,
            token
        }),
        [token, setRouteLock]
    );
    let menus = null;
    if (!token) {
        menus = (
            <Routes>
                {landingPageRoutes.map((route) => (
                    <Route key={route.name} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        );
    } else {
        menus = (
            <Routes>
                <>
                    {mainAppRoutes.map((route) =>
                        !route.lockRedirect ? (
                            <Route key={route.name} path={route.path} element={<route.component />} />
                        ) : (
                            <Route
                                key={route.name}
                                path={route.path}
                                element={
                                    <RouteLock isLocked={routeLock} navigateTo={route.lockRedirect}>
                                        <route.component />
                                    </RouteLock>
                                }
                            />
                        )
                    )}
                </>
            </Routes>
        );
    }
    return (
        <AppContext.Provider value={appContext}>
            <Layout>
                <Suspense fallback={<Spinner />}>
                    <div className="app">{menus}</div>
                </Suspense>
            </Layout>
        </AppContext.Provider>
    );
}

export default App;
