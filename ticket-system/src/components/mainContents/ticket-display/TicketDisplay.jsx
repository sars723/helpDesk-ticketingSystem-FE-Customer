import React from "react";
import "./TicketDisplay.css";
import TicketHeader from "./ticket-list/TicketHeader";
import TicketList from "./ticket-list/TicketList";
const TicketDisplay = () => {
  return (
    <div className=" ticket-display col-12 col-md-9">
      <TicketHeader />
      <TicketList />
    </div>
  );
};

export default TicketDisplay;
