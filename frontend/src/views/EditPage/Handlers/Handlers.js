class Handlers {
  constructor(main) {
    this.main = this.main;
    this.modalHandler = this.modalHandler.bind(this);
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
