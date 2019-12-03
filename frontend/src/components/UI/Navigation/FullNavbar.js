import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  UncontrolledTooltip
} from "reactstrap";
import { connect } from "react-redux";
import { NavLink as RouterLink, withRouter } from "react-router-dom";

import "./FullNavbar.scss";
import logo from "../../../assets/images/logo.PNG";
import * as actions from "../../../store/actions/authenticationActions/logout/logoutActions";

class FullNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  logout = () => {
    this.props.onLogout();
  };

  render() {
    let links = null;
    const { logoutAction } = this.props;
    if (!this.props.isAuth) {
      links = (
        <>
          <NavItem>
            <NavLink
              to="/"
              tag={RouterLink}
              className="nav"
              activeClassName="isActive"
              exact
            >
              Sign In
            </NavLink>
          </NavItem>
        </>
      );
    } else {
      links = (
        <>
          <NavItem>
            <NavLink
              to="/mainPage"
              className="nav"
              activeClassName="isActive"
              tag={RouterLink}
              exact
            >
              Daily Outlay
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              to="/statsPage"
              className="nav"
              activeClassName="isActive"
              tag={RouterLink}
              exact
            >
              Stats Page
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className="nav"
              href="#"
              onClick={() => {
                logoutAction();
              }}
            >
              Sign out
            </NavLink>
          </NavItem>
        </>
      );
    }
    return (
      <>
        <Navbar color="white" light expand="md">
          <NavbarToggler onClick={this.toggle} />

          <NavbarBrand href="https://github.com/vjnadar">
            <span id="logo" className="logoFontColor">
              <img src={logo} alt="Log" className="logoImg" />
              Outlay Manager
            </span>
          </NavbarBrand>

          <UncontrolledTooltip target="logo" placement="top">
            <b>Outlay Manager</b>
          </UncontrolledTooltip>

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">{links}</Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.authenticationReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => {
      dispatch(actions.syncLogout());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FullNavbar)
);
