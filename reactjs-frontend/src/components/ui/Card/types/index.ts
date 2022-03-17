import { ReactNode } from "react";

export type CardProps = {
    header?: string | ReactNode;
    body?: boolean;
    children: ReactNode;
};
