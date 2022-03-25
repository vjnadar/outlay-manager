import { Navigate } from "react-router-dom";

import { RouteLockProps } from "./types";

export function RouteLock({ isLocked, children, navigateTo }: RouteLockProps) {
    const routeComponent = !isLocked ? children : <Navigate to={navigateTo} />;
    return (
        <>
            {/* @ts-ignore:Component needs fragments to be returned as a JSX element. */}
            {routeComponent}
        </>
    );
}
