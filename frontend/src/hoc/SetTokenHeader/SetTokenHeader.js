import React, { Component } from "react";
import { AppContext } from "../../contexts/contexts";

const SetTokenHeader = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        interceptor: axios.interceptors.request.use(
          config => {
            console.log("Mount");
            config.headers.Authorization = `Bearer ${this.context.token}`;
            console.log(config);
            return config;
          }
          // error=> {
          //
          //   return Promise.reject(error);
          // }
        )
      };
    }

    static contextType = AppContext;

    componentWillUnmount() {
      axios.interceptors.request.eject(this.state.interceptor);
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
