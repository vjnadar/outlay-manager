import React from "react";
import "./Modal.scss";
import {
  Modal as ReactstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
const Modal = props => {
  const externalCloseBtn = <button hidden></button>;
  return (
    <>
      <ReactstrapModal
        isOpen={props.modal}
        toggle={props.modalHandler}
        backdrop={props.backdrop}
        className={props.className}
        external={externalCloseBtn}
      >
        <ModalHeader toggle={props.modalHandler}>{props.header}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
      </ReactstrapModal>
    </>
  );
};
export default Modal;
