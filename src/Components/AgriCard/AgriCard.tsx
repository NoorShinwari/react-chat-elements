import * as React from "react";
import { Card } from "react-bootstrap";
import "./AgriCard.scss";

export interface AgriCardProps {
  children: any;
  fadeIn?: boolean;
  className?: string;
  dataIndex?: string;
  cardId?: string;
}

function AgriCard(props: AgriCardProps) {
  return (
    <Card
      data-index={props.dataIndex ? props.dataIndex.toString() : ""}
      className={
        "shadow p-2 mx-auto mx-md-n2 my-2 agricard " +
        (props.fadeIn ? " fade-in " : "") +
        (props.className ? " " + props.className + " " : "")
      }
      data-card-id={props.cardId}
    >
      {props.children}
    </Card>
  );
}

export default AgriCard;
