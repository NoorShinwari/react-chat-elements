import * as React from "react";
import { Row, Col, Toast, NavDropdown, Card } from "react-bootstrap";
import { Button } from "react-chat-elements";

export interface ToastNotifyProps {
  decrement: () => void;
  id: string;
}

const ToastNotify: React.SFC<ToastNotifyProps> = (props) => {
  const [show, setShow] = React.useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show} onClick={props.decrement}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
    </Toast>
  );
};

export default ToastNotify;
