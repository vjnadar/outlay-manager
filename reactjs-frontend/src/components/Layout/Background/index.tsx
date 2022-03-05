import "./Background.scss";

import { useSelector } from "react-redux";

import { RootState } from "../../../store/types";

function Background(): JSX.Element {
    const { token } = useSelector((state: RootState) => state.authenticationReducer);
    const isAuth = !!token;
    let currentBgImage = "loginImg";
    if (isAuth) {
        currentBgImage = "bgImg";
    }
    return (
        <div className="bg">
            <div className={currentBgImage} />
        </div>
    );
}

export default Background;
