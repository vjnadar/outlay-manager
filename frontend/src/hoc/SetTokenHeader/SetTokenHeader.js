import React, { Component } from "react";
import { AppContext } from "../../contexts/contexts";

const SetTokenHeader = (WrappedComponent, axios) => {
  return class extends Component {
    static contextType = AppContext;

    componentWillMount() {
      this.interceptor = axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${this.context.token}`;
          return config;
        }
        // error=> {
        //
        //   return Promise.reject(error);
        // }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.interceptor);
    }

    render() {
      return (
        <>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default SetTokenHeader;
