import React from "react";
import "./Ticket.css";
const Ticket = ({ data }) => {
  return (
    <div className="ticket row mb-5">
      <div className="col-md-4">
        <h5>{data.subject}</h5>
        <div className="user-category">
          <p>user</p>
          <p>category</p>
        </div>
      </div>
      <div className="col-md-8 d-flex justify-content-between align-items-center ">
        <p>High</p>
        <p>New</p>
        <p>11 hours ago</p>
        <p>sara</p>
        <p>2 hours ago</p>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default Ticket;
