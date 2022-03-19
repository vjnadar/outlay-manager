import "./Layout.scss";

import { Children } from "../../generalTypes";
import Background from "./Background";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function Layout({ children }: Children): JSX.Element {
    return (
        <>
            <Navbar />
            <Background />
            <main className="children">{children}</main>
            <Footer />
        </>
    );
}
