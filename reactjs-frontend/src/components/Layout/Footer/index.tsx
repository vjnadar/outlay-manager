// import { Container } from "reactstrap";
import "./Footer.scss";

function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <p>
                <small>
                    © {new Date().getFullYear()}
                    <a href="https://github.com/vjnadar"> Korkai Software,</a> All Rights Reserved.
                </small>
            </p>
        </footer>
    );
}

export default Footer;
