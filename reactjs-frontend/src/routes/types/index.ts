import { LazyExoticComponent, MemoExoticComponent } from "react";

export type Routes = {
    path: string;
    name: string;
    component: LazyExoticComponent<() => JSX.Element> | LazyExoticComponent<MemoExoticComponent<() => JSX.Element>>;
    lockRedirect: string | false;
};
