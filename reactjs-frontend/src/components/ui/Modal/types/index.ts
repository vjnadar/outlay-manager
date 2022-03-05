import { ReactNode } from "react";

export type ModalProps = {
    isOpen: boolean;
    modalHandler: () => void;
    backdrop?: "static" | boolean;
    className?: string;
    externalCloseButton?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    header?: string;
};
