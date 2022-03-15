import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";

export type SingleDatePickerProps = {
    date: Moment;
    focused: boolean;
    focusChange: Dispatch<SetStateAction<boolean>>;
    dateChange: (date?: Moment) => void;
};
