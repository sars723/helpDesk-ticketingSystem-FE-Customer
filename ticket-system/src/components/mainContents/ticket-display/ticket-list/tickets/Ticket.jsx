import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import "./Ticket.css";
/* import { removeTicketAction } from "../../../../../redux/actions"; */
import { connect } from "react-redux";
import moment from "moment";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.currentUser,
});
/* const mapDispatchToProps = (dispatch) => ({
  removeTicket: (index) => dispatch(removeTicketAction(index)),
}); */
const Ticket = ({ ticket, history, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(async () => {}, []);

  return (
    <div className="ticket row mb-5 flex-wrap ">
      <div className="col-md-5">
        {console.log(ticket, "ticketlistcheck")}
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
      {/* problem */}
      <div className="col-2">
        {" "}
        <p>{ticket.assignedTo ? currentUser.email : user ? user.name : ""}</p>
      </div>
      <div className="col-1">
        {" "}
        <p>{moment(ticket.updatedAt).fromNow()}</p>
      </div>
      <div className="col-1 d-flex justify-content-center">
        <OverlayTrigger
          trigger="click"
          key="left"
          placement="left"
          overlay={
            <Popover id="popover-positioned-left">
              <Popover.Content>
                <ul className="d-flex justify-content-between align-items-center mb-1 mt-1">
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

export default connect(mapStateToProps)(withRouter(Ticket));
