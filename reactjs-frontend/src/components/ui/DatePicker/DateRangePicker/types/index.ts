import { Moment } from "moment";
import { FocusedInputShape } from "react-dates";

export type DateRangePickerProps = {
    dataAvailable: boolean;
    startDate: Moment | null;
    endDate: Moment | null;
    dateChangeHandler: (start: Moment | null, end: Moment | null) => void;
    focusedInput: FocusedInputShape | null;
    focusChangeHandler: (focused: FocusedInputShape | null) => void;
};
