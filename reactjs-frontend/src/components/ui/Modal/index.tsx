import "./Modal.scss";

import { Modal as ReactstrapModal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { ModalProps } from "./types";

export function Modal({ isOpen, modalHandler, backdrop, className, header, footer, children }: ModalProps) {
    const closeButton = <button type="button" hidden />;
    return (
        <ReactstrapModal isOpen={isOpen} toggle={modalHandler} backdrop={backdrop} className={className} external={closeButton}>
            <ModalHeader toggle={modalHandler}>{header}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
        </ReactstrapModal>
    );
}
