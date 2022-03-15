import { createContext } from "react";

import { AppContextType, MainPageContextType } from "./types";

export const MainPageContext = createContext<MainPageContextType>({});

export const AppContext = createContext<AppContextType>({});
