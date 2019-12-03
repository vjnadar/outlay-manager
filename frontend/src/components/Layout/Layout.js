import React, { Component } from "react";

import Background from "../UI/Background/Background";
import FullNavbar from "../UI/Navigation/FullNavbar";
import "./Layout.scss";

class Layout extends Component {
  render() {
    return (
      <>
        <Background />
        <FullNavbar />
        <main className="children">{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
