import React from "react";
import "./TicketHeader.css";

const TicketHeader = () => {
  return (
    <div className="ticket-header row flex-wrap text-center">
      <div className="col-md-5 ">
        <p>Subject</p>
      </div>
      {/* <div className="col-md-8 d-flex justify-content-between align-items-center "> */}
      <div className="col-md-1">
        <p>Priority</p>
      </div>
      <div className="col-md-1">
        <p>Status</p>
      </div>
      <div className="col-md-1">
        <p>Date</p>
      </div>
      <div className="col-md-2">
        {" "}
        <p>Agent</p>
      </div>
      <div className="col-md-1">
        {" "}
        <p>Updated</p>
      </div>
      <div className="col-md-1 d-flex justify-content-end align-items-center ">
        <input type="checkbox" />
      </div>
      {/*  </div> */}
    </div>
  );
};

export default TicketHeader;
