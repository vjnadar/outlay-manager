import { lazy, LazyExoticComponent } from "react";

export const Signin: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./SignIn"));
export const Signup: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./Signup"));
export const MainPage: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./MainPage"));
export const EditPage: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./EditPage"));
export const ResetPassword: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./ResetPassword"));
export const ResetPasswordRequest: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./ResetPasswordRequest"));
export const StatsPage: LazyExoticComponent<() => JSX.Element> = lazy(() => import("./StatsPage"));
