import "./Navbar.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { Collapse, Nav, Navbar as ReactstrapNavbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledTooltip } from "reactstrap";

import logo from "../../../assets/images/logo.png";
import { logoutSagaActionCreator } from "../../../store/authentication/redux";
import { RootState } from "../../../store/types";

function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.authenticationReducer);
    let links = null;
    if (!token) {
        links = (
            <NavItem>
                <NavLink to="/" tag={RouterLink} className="nav" active={!!pathname.includes("/")}>
                    Sign In
                </NavLink>
            </NavItem>
        );
    } else {
        links = (
            <>
                <NavItem>
                    <NavLink to="/mainPage" className="nav" active={!!pathname.includes("/mainPage")} tag={RouterLink}>
                        Daily Outlay
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/statsPage" className="nav" active={!!pathname.includes("/statsPage")} tag={RouterLink}>
                        Stats Page
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav"
                        href="#"
                        onClick={() => {
                            dispatch(logoutSagaActionCreator());
                        }}
                    >
                        Sign out
                    </NavLink>
                </NavItem>
            </>
        );
    }
    return (
        <ReactstrapNavbar color="white" light expand="md">
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <NavbarBrand href="https://github.com/vjnadar">
                <span id="logo" className="logoFontColor">
                    <img src={logo} alt="Log" className="logoImg" />
                    Outlay Manager
                </span>
            </NavbarBrand>
            <UncontrolledTooltip target="logo" placement="top">
                <b>Outlay Manager</b>
            </UncontrolledTooltip>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto">{links}</Nav>
            </Collapse>
        </ReactstrapNavbar>
    );
}
export default Navbar;
