import React from "react";
// import { Container } from "reactstrap";
import "./Footer.scss";

const Footer = props => {
  return (
    <>
      <footer>
        <p>
          <small className="footer">
            © {new Date().getFullYear()}
            <a href="https://github.com/vjnadar"> Korkai Software,</a> All
            Rights Reserved.
          </small>
        </p>
      </footer>
    </>
  );
};

export default Footer;
