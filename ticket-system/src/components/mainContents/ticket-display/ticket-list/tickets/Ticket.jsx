import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./Ticket.css";
import { removeTicketAction } from "../../../../../redux/actions";
import { connect } from "react-redux";
import moment from "moment";

const mapDispatchToProps = (dispatch) => ({
  removeTicket: (index) => dispatch(removeTicketAction(index)),
});
const Ticket = ({ ticket, history }) => {
  const [user, setUser] = useState(null);

  const deleteTicket = async () => {
    console.log();
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/" + ticket._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        alert("deleted successfully");
        window.location.reload(false);
      } else {
        alert("sth wrong");
      }
    } catch (error) {}
  };
  useEffect(async () => {
    try {
      const response = await fetch(
        "http://localhost:3004/users/" + ticket.sender,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const fetchedUser = await response.json();

        setUser(fetchedUser);
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="ticket row mb-5">
      <div className="col-md-4">
        <h5
          onClick={() => {
            history.push("/ticketDetail/" + ticket._id);
          }}
        >
          {ticket.subject}
        </h5>
        <div className="user-category">
          <p>
            <i class="fa fa-user"></i>
            {user && user.name}
          </p>
          <p>
            <i class="fa fa-folder-open"></i>
            {ticket.category}
          </p>
        </div>
      </div>
      <div className="col-md-8 d-flex justify-content-between align-items-center ">
        <p>{ticket.priority}</p>
        <p>{ticket.status}</p>
        <p>{moment(ticket.createdAt).fromNow()}</p>
        <p>{user && user.name}</p>
        <p>{moment(ticket.updatedAt).fromNow()}</p>
        <OverlayTrigger
          trigger="click"
          key="left"
          placement="left"
          overlay={
            <Popover id="popover-positioned-left">
              <Popover.Content>
                <ul className="d-flex justify-content-between align-items-center mb-1 mt-1">
                  <li onClick={() => deleteTicket()}>Delete</li>
                  <li>Close</li>
                  <li>Assign</li>
                  <li>Change Priority</li>
                  <li>Change Category</li>
                  <li>Due</li>
                  <li>Tag</li>
                  <li>Print</li>
                </ul>
              </Popover.Content>
            </Popover>
          }
        >
          <input type="checkbox" />
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default connect(mapDispatchToProps)(withRouter(Ticket));
