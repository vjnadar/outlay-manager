import moment from "moment";

import { setEntries } from "../../../utilityMethods/utilityMethods";

class MainPageMethods {
  constructor(main) {
    this.main = main;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteDateEntry = this.deleteDateEntry.bind(this);
  }

  handleSubmit(values, resetForm, validateForm) {
    const { date } = this.main.state;
    const selectedDate =
      date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
        ? moment()
        : date.set({ hour: 23, minute: 59, millisecond: 0, second: 59 });
    let entries = setEntries(values, selectedDate, "");
    if (entries) {
      const { postDateDataAction } = this.main.props;
      validateForm(values).then(() => {
        postDateDataAction(entries, this.main.handlers.modalHandler, resetForm);
      });
    } else {
      return;
    }
  }

  deleteDateEntry(id, closeModalCallback) {
    const { date } = this.main.state;
    const { deleteDateEntryAction } = this.main.props;
    deleteDateEntryAction(id, date, closeModalCallback);
  }
}

export default MainPageMethods;
