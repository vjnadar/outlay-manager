import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import "bootstrap/dist/css/bootstrap.css";

import "./index.scss";
import App from "./App";
import { mainPageReducer } from "./store/reducers/mainPageReducer/mainPageReducer";
import { editPageReducer } from "./store/reducers/editPageReducer/editPageReducer";
import { statsPageReducer } from "./store/reducers/statsPageReducer/statsPageReducer";
import { authenticationReducer } from "./store/reducers/authenticationReducer/authenticationReducer";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const allReducers = combineReducers({
  mainPageReducer,
  editPageReducer,
  statsPageReducer,
  authenticationReducer
});
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk))
);
const app = (
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
