import React from "react";
import {
  Card as ReactstrapCard,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";

const Card = props => {
  return (
    <>
      <ReactstrapCard>
        {props.header && <CardHeader>{props.header}</CardHeader>}
        {props.body && <CardBody>{props.children}</CardBody>}
        {!props.body && props.children}
        {props.footer && <CardFooter>{props.children}</CardFooter>}
      </ReactstrapCard>
    </>
  );
};
export default Card;
