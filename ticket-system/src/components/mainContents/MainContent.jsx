import React from "react";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import TicketDisplay from "./ticket-display/TicketDisplay";
const MainContent = () => {
  return (
    <div className="" style={{ margin: "20px 50px" }}>
      <div className="row mt-4">
        <LeftSidebar />
        <TicketDisplay />
      </div>
    </div>
  );
};

export default MainContent;
