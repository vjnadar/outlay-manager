import moment from "moment";

import { setEntries } from "../../../utilityMethods/utilityMethods";

class EditPageMethods {
  constructor(main) {
    this.main = main;
    this.updateRecord = this.updateRecord.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.main.context.lockRoute(true);
  }

  updateRecord(values) {
    const { updateDateEntryAction } = this.main.props;
    const { _id, date, time } = this.main.props.location.fromTable;
    const dateTime = new Date(date + " " + time);
    const selectedDate = moment(dateTime);
    const newEntry = setEntries(values, selectedDate, _id);
    updateDateEntryAction(newEntry, this.main.handlers.modalHandler);
  }
}

export default EditPageMethods;
