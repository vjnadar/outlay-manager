import { Card as ReactstrapCard, CardBody, CardHeader } from "reactstrap";

import { CardProps } from "./types";

export function Card({ header, body, children }: CardProps) {
    return (
        <ReactstrapCard>
            {header && <CardHeader>{header}</CardHeader>}
            {body && <CardBody>{children}</CardBody>}
            {!body && children}
        </ReactstrapCard>
    );
}
