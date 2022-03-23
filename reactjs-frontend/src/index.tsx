import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import interceptors from "./interceptors";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./store";

const store = configureStore();
interceptors.setupInterceptors(store);
ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <div role="alert">
                    <div>Oh no</div>
                    <pre>{error.message}</pre>
                </div>
            )}
        >
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
