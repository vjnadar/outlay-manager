import { Dispatch, SetStateAction } from "react";

export type AppContextType = {
    setRouteLock: Dispatch<SetStateAction<boolean>>;
    token: string;
};
