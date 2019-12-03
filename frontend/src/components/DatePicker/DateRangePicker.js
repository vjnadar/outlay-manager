import React from "react";
import { DateRangePicker as ReactDateRangePicker } from "react-dates";

const DateRangePicker = props => {
  return (
    <>
      <ReactDateRangePicker
        startDate={props.startDate} // momentPropTypes.momentObj or null,
        startDateId="From" // PropTypes.string.isRequired,
        endDate={props.endDate} // momentPropTypes.momentObj or null,
        endDateId="To" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          props.dateChangeHandler(startDate, endDate);
        }} // PropTypes.func.isRequired,
        focusedInput={props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        isOutsideRange={() => false}
        numberOfMonths={1}
        small={true}
        onFocusChange={focusedInput => {
          props.focusChangeHandler(focusedInput);
        }} // PropTypes.func.isRequired,
      />
    </>
  );
};

export default React.memo(DateRangePicker);
