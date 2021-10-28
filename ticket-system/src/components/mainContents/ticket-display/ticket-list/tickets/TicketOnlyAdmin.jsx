import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import "./TicketOnlyAdmin.css";
import { removeTicketAction } from "../../../../../redux/actions";
import { connect } from "react-redux";
import moment from "moment";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  removeTicket: (index) => dispatch(removeTicketAction(index)),
});
const Ticket = ({ ticket, history, currentUser }) => {
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
        "http://localhost:3004/users/" + ticket.sender._id,
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
        alert("sth wrong ticket.jsx component fetching ticket sender");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="ticket row mb-5 flex-wrap ">
      <div className="col-md-5">
        <h5
          onClick={() => {
            history.push("/ticketDetailAdmin/" + ticket._id);
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
      <div className="col-1">
        {" "}
        {ticket.priority === "Critical" ? (
          <Badge variant="danger">{ticket.priority}</Badge>
        ) : (
          <p>{ticket.priority}</p>
        )}
      </div>
      <div className="col-1">
        <p>
          <Badge variant={ticket.status === "closed" ? "secondary" : "success"}>
            {ticket.status}
          </Badge>
        </p>
      </div>

      <div className="col-1">
        {" "}
        <p>{moment(ticket.createdAt).fromNow()}</p>
      </div>
      <div className="col-2">
        {" "}
        <p>{ticket.assignedTo ? currentUser.email : user ? user.name : ""}</p>
      </div>
      <div className="col-1">
        {" "}
        <p>{moment(ticket.updatedAt).fromNow()}</p>
      </div>
      <div className="col-md-1 d-flex justify-content-center ">
        <OverlayTrigger
          trigger="click"
          key="left"
          placement="left"
          overlay={
            <Popover id="popover-positioned-left">
              <Popover.Content>
                <ul className="d-flex justify-content-between align-items-center mb-1 mt-1">
                  <li onClick={() => deleteTicket()}>Delete</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ticket));
