import { Moment } from "moment";
import React from "react";
import { DateRangePicker as ReactDateRangePicker } from "react-dates";

import { DateRangePickerProps } from "./types";

function DateRangePicker({ dataAvailable, startDate, endDate, dateChangeHandler, focusedInput, focusChangeHandler }: DateRangePickerProps) {
    return (
        <ReactDateRangePicker
            openDirection={dataAvailable ? "up" : "down"}
            startDate={startDate}
            startDateId="From"
            endDate={endDate}
            endDateId="To"
            onDatesChange={({ startDate: start, endDate: end }: { startDate: Moment | null; endDate: Moment | null }) => {
                dateChangeHandler(start, end);
            }}
            focusedInput={focusedInput}
            isOutsideRange={() => false}
            numberOfMonths={1}
            small
            onFocusChange={(focused) => {
                focusChangeHandler(focused);
            }}
        />
    );
}

export default React.memo(DateRangePicker);
