import { Moment } from "moment";

export type SingleDatePickerProps = {
    date: Moment;
    focused: boolean;
    focusChange: (focus: boolean) => void;
    dateChange: (date?: Moment) => void;
};
