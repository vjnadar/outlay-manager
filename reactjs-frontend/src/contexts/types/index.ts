import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";

import { EmptyObject } from "../../generalTypes";

export type AppContextType =
    | {
          setRouteLock: Dispatch<SetStateAction<boolean>>;
          token: string;
      }
    | EmptyObject;
export type MainPageContextType =
    | {
          modalHandler: () => void;
          dateChangeHandler: (dateMoment?: Moment) => void;
          focusChangeHandler: Dispatch<SetStateAction<boolean>>;
          deleteDateEntry: (id: string, closeModalCallback: () => void) => void;
      }
    | EmptyObject;
