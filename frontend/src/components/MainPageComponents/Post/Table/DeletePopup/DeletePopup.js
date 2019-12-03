import React from "react";
import { Button } from "reactstrap";
import Modal from "../../../../UI/Modal/Modal";
const DeletePopup = props => {
  return (
    <>
      <Modal
        header="Are your sure?"
        modal={props.modal}
        modalHandler={props.modalHandler}
        footer={
          <>
            {" "}
            <Button outline color="danger" onClick={props.deleteDateEntry}>
              YES
            </Button>
            &nbsp;
            <Button outline color="secondary" onClick={props.modalHandler}>
              NO!
            </Button>
          </>
        }
      >
        <p>Do you want to delete this entry?</p>
      </Modal>
    </>
  );
};
export default DeletePopup;
