import React from "react";

export const MainPageContext = React.createContext({
  modalHandler: {},
  dateChangeHandler: {},
  focusChangeHandler: {},
  deleteDateEntry: {},
  match: {},
  history: {}
});

export const AppContext = React.createContext({ lockRoute: {}, token: "" });
