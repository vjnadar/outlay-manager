import axios from "./httpClient";

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
    }
};
