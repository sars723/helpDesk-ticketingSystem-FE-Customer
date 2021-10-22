import React from "react";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import TicketDisplay from "./ticket-display/TicketDisplay";
const MainContent = ({ searchQuery }) => {
  return (
    <div className="container">
      <div className="row mt-4">
        <LeftSidebar />
        <TicketDisplay searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default MainContent;
