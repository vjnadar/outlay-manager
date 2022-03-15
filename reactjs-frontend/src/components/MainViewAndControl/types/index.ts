import { Moment } from "moment";

import { GrandTotalObj, SelectedDateEntry } from "../../../store/mainPage/types";

export type MainViewAndControlProps = {
    grandTotal: GrandTotalObj[];
    date: Moment;
    focused: boolean;
    entryFromDate: SelectedDateEntry;
};
