import axios from "./httpClient";
import { logoutSagaActionCreator } from "./store/authentication/redux";

export default {
    setupInterceptors: (store) => {
        axios.interceptors.request.use((config) => {
            const configuration = config;
            if (store.getState().authenticationReducer.token) {
                configuration.headers.Authorization = `Bearer ${store.getState().authenticationReducer.token}`;
                return configuration;
            }
            return configuration;
        });
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.data.message === "jwt expired") {
                    store.dispatch(logoutSagaActionCreator({ message: "Sorry. Your token expired! Log in again." }));
                }
                return Promise.reject(error);
            }
        );
    }
};
