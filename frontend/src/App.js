import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import Layout from "./components/Layout/Layout";
import MainPage from "./views/MainPage/MainPage";
import { AppContext, ResetPasswordContext } from "./contexts/contexts";
import * as actions from "./store/actions/authenticationActions/logout/logoutActions";
import * as resetPasswordActions from "./store/actions/authenticationActions/put/putActions";
import * as OutlayComponents from "./views/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeLock: true
    };
  }
  componentDidMount() {
    const { automaticLogoutAction } = this.props;
    automaticLogoutAction();
  }

  lockRoute = booleanVal => {
    this.setState({ routeLock: booleanVal });
  };

  render() {
    const { token, resetPassword, resetPasswordRequest } = this.props;
    const { routeLock } = this.state;
    const appContext = {
      lockRoute: this.lockRoute,
      token
    };
    const resetPasswordContext = {
      resetPassword,
      resetPasswordRequest
    };

    let menus = null;
    if (!token) {
      menus = (
        <>
          <ResetPasswordContext.Provider value={resetPasswordContext}>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <OutlayComponents.Signin {...props} />}
              />
              <Route
                path="/signup"
                render={props => <OutlayComponents.Signup {...props} />}
              />

              <Route
                path="/resetPasswordRequest"
                render={props => (
                  <OutlayComponents.ResetPasswordRequest {...props} />
                )}
              />
              <Route
                path="/resetPassword/:token"
                render={props => <OutlayComponents.ResetPassword {...props} />}
              />

              <Redirect to="/" />
            </Switch>
          </ResetPasswordContext.Provider>
        </>
      );
    } else {
      menus = (
        <>
          <Switch>
            <Route
              exact
              path="/mainPage"
              render={props => <MainPage {...props} />}
            />
            {!routeLock ? (
              <Route
                path={"/editPage"}
                render={props => <OutlayComponents.EditPage {...props} />}
              />
            ) : null}
            <Route
              path="/statsPage"
              render={props => <OutlayComponents.StatsPage {...props} />}
            />
            <Redirect to="/mainPage" />
          </Switch>
        </>
      );
    }
    return (
      <Suspense fallback={<></>}>
        <div className="app">
          <AppContext.Provider value={appContext}>
            <OutlayComponents.Layout>{menus}</OutlayComponents.Layout>
          </AppContext.Provider>
        </div>
      </Suspense>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.authenticationReducer.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    automaticLogoutAction: () => {
      dispatch(actions.automaticLogout());
    },
    resetPasswordRequest: (body, modalHandler) => {
      dispatch(resetPasswordActions.resetPasswordRequest(body, modalHandler));
    },
    resetPassword: (body, modalHandler, setResetSuccess) => {
      dispatch(
        resetPasswordActions.resetPassword(body, modalHandler, setResetSuccess)
      );
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
