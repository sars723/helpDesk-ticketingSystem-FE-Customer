import React from "react";
import "./TicketDisplay.css";
import TicketHeader from "./ticket-list/TicketHeader";
import TicketList from "./ticket-list/TicketList";
const TicketDisplay = ({ searchQuery }) => {
  return (
    <div className=" ticket-display col-12 col-md-9">
      <TicketHeader />
      <TicketList searchQuery={searchQuery} />
    </div>
  );
};

export default TicketDisplay;
