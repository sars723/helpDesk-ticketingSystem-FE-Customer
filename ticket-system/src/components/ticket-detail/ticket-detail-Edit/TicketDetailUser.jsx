import React, { useEffect, useState } from "react";
import "./TicketDetailEdit.css";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsersAction } from "../../../redux/actions";
import { withRouter } from "react-router";

const mapStateToProps = (state) => ({
  users: state.user.users,
  tickets: state.ticket.tickets,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(setUsersAction()),
});
const TicketDetailUser = ({ ticket, users, getUsers, tickets, history }) => {
  const [editTicketDetail, setEditTicketDetail] = useState({
    priority: false,
    category: false,
    From: false,
    assignedTo: false,
    createdAt: false,
  });
  const [ticketDetail, setTicketDetail] = useState({
    priority: ticket.priority,
    category: ticket.category,
    sender: ticket.sender,
    assignedTo: ticket.assignedTo,
    createdAt: ticket.createdAt,
  });
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  return (
    <div className="ticket-detail-edit col-md-4 pl-4 ticket-detail-status">
      <div className="ticket-detail-status-header">
        {console.log(ticketDetail.priority)}
        <p className="mb-0">Details</p>
      </div>
      <div className="ticket-detail-status-content">
        <div className="row">
          <div className="col-3 p-0">
            <p>priority:</p>
          </div>
          <div className="col-9 d-flex justify-content-between">
            <p>{ticket.priority}</p>{" "}
          </div>
        </div>

        <div className="row ">
          <div className="col-3 p-0">
            <p>Category:</p>
          </div>
          <div className="col-9  d-flex justify-content-between">
            <p>{ticket.category}</p>{" "}
          </div>
        </div>

        <div className="row ">
          <div className="col-3 p-0">
            <p>User:</p>
          </div>
          <div className="col-9  d-flex justify-content-between">
            {console.log("ticket sender namr", ticket.sender)}
            <p>{ticket.sender.name}</p>
          </div>
        </div>

        <div className="row ">
          <div className="col-3 p-0">
            <p>Assigned To:</p>
          </div>
          <div className="col-9  d-flex justify-content-between">
            {/* {users &&
              users
                .filter((user) => user._id === ticket.assignedTo._id)
                .map((user) => */}{" "}
            <p>{ticket.assignedTo ? ticket.assignedTo.email : "none"}</p>
            {/* )} */}
          </div>
        </div>

        <div className="row ">
          <div className="col-3 p-0">
            <p>Date:</p>
          </div>
          <div className="col-9  d-flex justify-content-between">
            <p>Created At</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TicketDetailUser));
