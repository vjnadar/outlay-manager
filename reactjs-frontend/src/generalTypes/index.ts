import { ReactNode } from "react";

export interface ErrorType extends Error {
    statusCode?: number;
    data?: Record<string, unknown>;
}
export interface CommonTypeProperties<T> {
    [key: string]: T;
}
export type EmptyObject = {
    [K in string]: never;
};
export type Children = {
    children: ReactNode;
};
