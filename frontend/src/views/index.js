import React from "react";

export const Layout = React.lazy(() => import("../components/Layout/Layout"));
export const Signin = React.lazy(() => import("../views/Signin/Signin"));
export const Signup = React.lazy(() => import("../views/Signup/Signup"));
export const MainPage = React.lazy(() => import("../views/MainPage/MainPage"));
export const EditPage = React.lazy(() => import("../views/EditPage/EditPage"));
export const StatsPage = React.lazy(() =>
  import("../views/StatsPage/StatsPage")
);
