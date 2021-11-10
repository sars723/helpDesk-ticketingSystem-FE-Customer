import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import "./TicketOnlyAdmin.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  setTicketsOnlyAdminAction,
  setUsersAction,
} from "../../../../../redux/actions";

const mapStateToProps = (state) => ({
  users: state.user.users,
  tickets: state.ticketAdminOnly.tickets,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(setUsersAction()),
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});

const Ticket = ({ ticket, history, users, getUsers, tickets, getTickets }) => {
  const [showPopup, setShowPopup] = useState(false);

  const deleteTicket = async () => {
    console.log();
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/tickets/" + ticket._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        alert("ticket deleted successfully");
        getTickets();
        setShowPopup(false);
      } else {
        alert("sth wrong deleting ticket toAc");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
    /* getTickets(); */
  }, [tickets]);
  /* console.log(ticket, "ticket in ticketOnlyAdmin component"); */
  return (
    <tr>
      <td>
        <h5
          onClick={() => {
            /*  path="/ticketDetailAdmin/:ticketID" */
            history.push("/ticketDetailAdmin/" + ticket._id);
          }}
        >
          {" "}
          <span id="hide" className="hide ">
            Subject:{" "}
          </span>
          {ticket.subject}
        </h5>
        <div className="user-category">
          {/*  {console.log(users, "is user exist")} */}
          {/*     {users &&
            users
              .filter((user) => user._id === ticket.sender._id)
              .map((user) => (
                <p>
                  <i class="fa fa-user"></i>
                  {console.log("usercheck", user)}
                  {user.name}
                </p>
              ))} */}
          <p>
            <i class="fa fa-user"></i>

            {ticket.sender.name}
          </p>

          <p>
            <i class="fa fa-folder-open"></i>
            <span id="hide" className="hide ml-2 ">
              Category:{" "}
            </span>{" "}
            {ticket.category}
          </p>
        </div>
      </td>
      <td>
        {ticket.priority === "Critical" ? (
          <>
            <span id="hide" className="hide  ">
              Priority:
            </span>
            <Badge variant="danger">{ticket.priority}</Badge>
          </>
        ) : (
          <p>
            {" "}
            <span id="hide" className="hide ">
              Priority:{" "}
            </span>
            {ticket.priority}
          </p>
        )}
      </td>
      <td>
        <p>
          {" "}
          <span id="hide" className="hide ">
            Status:{" "}
          </span>
          <Badge variant={ticket.status === "closed" ? "secondary" : "success"}>
            {ticket.status}
          </Badge>
        </p>
      </td>
      <td>
        {" "}
        <p>
          {" "}
          <span id="hide" className="hide ">
            Created At:{" "}
          </span>
          {moment(ticket.createdAt).fromNow()}
        </p>
      </td>
      <td>
        <p>
          {" "}
          <span id="hide" className="hide ">
            Due date:{" "}
          </span>
          {ticket.dueDate && moment(ticket.dueDate).fromNow()}
        </p>
      </td>
      <td>
        {" "}
        <p>
          {/*  {" "}
          {ticket.assignedTo !== ""
            ? users &&
              users
                .filter((user) => user._id === ticket.assignedTo)
                .map((user) => user.email)
            : users &&
              users
                .filter((user) => user._id === ticket.sender._id)
                .map((user) => user.name)} */}
          {ticket.assignedTo === "" ? (
            <span style={{ color: "lightgrey" }}>not assigned</span>
          ) : (
            /*  users &&
            users
              .filter((user) => user._id === ticket.assignedTo)
              .map((user) => ( */
            <p>
              {" "}
              <span id="hide" className="hide ">
                Assigned to:{" "}
              </span>
              {ticket.assignedTo.email}
            </p>
            /*  )) */
          )}
        </p>
      </td>
      <td>
        {" "}
        <p>
          {" "}
          <span id="hide" className="hide ">
            Updated At:{" "}
          </span>
          {moment(ticket.updatedAt).fromNow()}
        </p>
      </td>
      <td>
        {" "}
        <OverlayTrigger
          show={showPopup}
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
          <input
            type="checkbox"
            checked={showPopup}
            onChange={() => setShowPopup(!showPopup)}
          />
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ticket));
