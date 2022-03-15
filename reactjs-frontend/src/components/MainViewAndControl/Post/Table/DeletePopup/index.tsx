import React from "react";
import { Button } from "reactstrap";

import { Modal } from "../../../..";
import { DeletePopupProps } from "./types";

function DeletePopup({ isOpen, modalHandler, deleteDateEntry }: DeletePopupProps): JSX.Element {
    return (
        <Modal
            header="Are your sure?"
            isOpen={isOpen}
            modalHandler={modalHandler}
            footer={
                <>
                    <Button outline color="danger" onClick={deleteDateEntry}>
                        YES
                    </Button>
                    &nbsp;
                    <Button outline color="secondary" onClick={modalHandler}>
                        NO!
                    </Button>
                </>
            }
        >
            <p>Do you want to delete this entry?</p>
        </Modal>
    );
}
export default DeletePopup;
