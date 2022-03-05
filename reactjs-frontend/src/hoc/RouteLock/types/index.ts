import { ReactNode } from "react";

export type RouteLockProps = {
    children: ReactNode;
    isLocked: boolean;
    navigateTo: string;
};
