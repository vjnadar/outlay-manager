import React, { useContext } from "react";

import "./Background.scss";
import { AppContext } from "../../../contexts/contexts";
const Background = props => {
  const appContext = useContext(AppContext);
  const isAuth = !!appContext.token;
  let currentBgImage = "loginImg";
  if (isAuth) {
    currentBgImage = "bgImg";
  }
  return (
    <>
      <div className="bg">
        <div className={currentBgImage}></div>
      </div>
    </>
  );
};

export default Background;
