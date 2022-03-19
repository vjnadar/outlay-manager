import * as OutlayManagerComponents from "../views";
import { Routes } from "./types";

export const landingPageRoutes: Routes[] = [
    {
        path: "/",
        name: "Signin",
        component: OutlayManagerComponents.Signin,
        lockRedirect: false
    },
    {
        path: "signup/*",
        name: "Signup",
        component: OutlayManagerComponents.Signup,
        lockRedirect: false
    },
    {
        path: "resetPasswordRequest/*",
        name: "ResetPasswordRequest",
        component: OutlayManagerComponents.ResetPasswordRequest,
        lockRedirect: false
    },
    {
        path: "resetPassword/:token/*",
        name: "ResetPassword",
        component: OutlayManagerComponents.ResetPassword,
        lockRedirect: false
    }
];
export const mainAppRoutes: Routes[] = [
    {
        path: "/mainPage",
        name: "MainPage",
        component: OutlayManagerComponents.MainPage,
        lockRedirect: false
    },
    {
        path: "editPage/*",
        name: "EditPage",
        component: OutlayManagerComponents.EditPage,
        lockRedirect: "/mainPage"
    },
    {
        path: "statsPage/*",
        name: "StatsPage",
        component: OutlayManagerComponents.StatsPage,
        lockRedirect: false
    }
];
