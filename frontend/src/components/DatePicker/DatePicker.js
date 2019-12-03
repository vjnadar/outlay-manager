import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import moment from "moment";

class DatePicker extends Component {
  render() {
    const { date } = this.props;
    let setDate = date ? date : moment();
    return (
      <>
        <SingleDatePicker
          anchorDirection="right"
          date={setDate} // momentPropTypes.momentObj or null
          onDateChange={date => this.props.dateChange(date)} // PropTypes.func.isRequired
          focused={this.props.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.props.focusChange(focused)}
          // PropTypes.func.isRequired
          showClearDate={false}
          isOutsideRange={() => false}
          numberOfMonths={1}
          displayFormat={"DD-MM-YYYY"}
          placeholder="Select a date"
          screenReaderInputMessage="Select a date"
        />
      </>
    );
  }
}
export default React.memo(DatePicker);
