import { string } from "yup";

import { FlowType } from "../../MainPage/types";

export type EditPageStateType = {
    _id: string;
    flowtype: FlowType;
    type: string;
    amount: string;
    date: string;
    time: string;
};
export type LocationType = {
    fromTable: EditPageStateType;
};
