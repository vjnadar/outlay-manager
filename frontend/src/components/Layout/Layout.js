import React, { Component } from "react";

import Background from "../UI/Background/Background";
import FullNavbar from "../UI/Navigation/FullNavbar";
import Footer from '../UI/Footer/Footer';
import "./Layout.scss";

class Layout extends Component {
  render() {
    return (
      <>
        <Background />
        <FullNavbar />
        <main className="children">{this.props.children}</main>
        <Footer/>
      </>
    );
  }
}

export default Layout;
