import { createContext } from "react";

import { AppContextType } from "./types";

// export const MainPageContext = createContext({
//     modalHandler: {},
//     dateChangeHandler: {},
//     focusChangeHandler: {},
//     deleteDateEntry: {},
//     match: {},
//     history: {}
// });

export const AppContext = createContext<AppContextType | null>(null);
// export const ResetPasswordContext = React.createContext({
//     resetPasswordRequest: () => {},
//     resetPassword: () => {}
// });
