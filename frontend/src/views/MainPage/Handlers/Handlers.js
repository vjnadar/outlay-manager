class Handlers {
  constructor(main) {
    this.main = main;
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.focusChangeHandler = this.focusChangeHandler.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
  }

  dateChangeHandler(date) {
    if (!date) {
      this.main.setState({ date: null });
      return;
    }
    this.main.setState({ date: date });
    this.main.getDateData(date);
  }

  focusChangeHandler(focused) {
    this.main.setState({ focused: focused });
  }

  modalHandler() {
    this.main.setState(prevState => {
      return {
        modal: !prevState.modal
      };
    });
  }
}

export default Handlers;
