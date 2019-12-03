class Handlers {
  constructor(main) {
    this.main = main;
    this.formHandler = this.formHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.focusChangeHandler = this.focusChangeHandler.bind(this);
  }

  formHandler(e) {
    this.main.setState({ [e.target.name]: e.target.value });
  }

  dateChangeHandler(startDate, endDate) {
    this.main.setState({ startDate, endDate });
  }

  focusChangeHandler(focusedInput) {
    this.main.setState({ focusedInput });
  }
}

export default Handlers;
