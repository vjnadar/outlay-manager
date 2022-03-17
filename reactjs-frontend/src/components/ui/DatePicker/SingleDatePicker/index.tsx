import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import moment, { Moment } from "moment";
import { memo } from "react";
import { SingleDatePicker as MainSingleDatePicker } from "react-dates";

import { SingleDatePickerProps } from "./types";

function SingleDatePicker({ date, dateChange, focused, focusChange }: SingleDatePickerProps) {
    const setDate = date || moment();
    return (
        <MainSingleDatePicker
            /* @ts-ignore */
            anchorDirection="right"
            date={setDate}
            /* @ts-ignore */
            onDateChange={(d: Moment) => dateChange(d)}
            focused={focused}
            /* @ts-ignore */
            onFocusChange={({ focused: focusInput }) => focusChange(focusInput)}
            showClearDate={false}
            isOutsideRange={() => false}
            numberOfMonths={1}
            displayFormat="DD-MM-YYYY"
            placeholder="Select a date"
            screenReaderInputMessage="Select a date"
        />
    );
}
export default memo(SingleDatePicker);
