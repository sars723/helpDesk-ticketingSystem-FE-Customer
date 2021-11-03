import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import "./Ticket.css";
import { connect } from "react-redux";
import moment from "moment";
import { setCurrentUserAction } from "../../../../../redux/actions";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});

const Ticket = ({ ticket, history, currentUser }) => {
  /* const [user, setUser] = useState(null); */
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
      } else {
        alert("sth wrong");
      }
    } catch (error) {}
  };

  /*   const fetchUser = async () => {
    console.log();
    try {
      const response = await fetch(
        "http://localhost:3004/users/" + ticket.assignedTo,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        alert("sth wrong fetching user tc");
      }
    } catch (error) {}
  }; */
  useEffect(() => {
    /*  fetchUser(); */
  }, [ticket]);

  return (
    <tr>
      <td>
        <h5
          onClick={() => {
            history.push("/ticketDetail/" + ticket._id);
          }}
        >
          {ticket.subject}
        </h5>
        <div className="user-category">
          <p>
            <i className="fa fa-user"></i>

            {currentUser.name}
          </p>

          <p>
            <i className="fa fa-folder-open"></i>
            {ticket.category}
          </p>
        </div>
      </td>
      <td>
        {ticket.priority === "Critical" ? (
          <Badge variant="danger">{ticket.priority}</Badge>
        ) : (
          <p>{ticket.priority}</p>
        )}
      </td>
      <td>
        <p>
          <Badge variant={ticket.status === "closed" ? "secondary" : "success"}>
            {ticket.status}
          </Badge>
        </p>
      </td>
      <td>
        {" "}
        <p>{moment(ticket.createdAt).fromNow()}</p>
      </td>
      <td>
        <p>{ticket.dueDate && moment(ticket.dueDate).fromNow()}</p>
      </td>
      <td>
        {" "}
        {/* <p> {ticket.assignedTo !== "" && user && user.name}</p> */}
        <p>
          {" "}
          {ticket.sender === "" ? (
            <span style={{ color: "lightgrey" }}>not assigned</span>
          ) : (
            ticket.sender.email
          )}
        </p>
      </td>
      <td>
        {" "}
        <p>{moment(ticket.updatedAt).fromNow()}</p>
      </td>
      <td>
        {" "}
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
      </td>
    </tr>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ticket));
