import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import TicketSort from "../../mainContents/left-sidebar/ticket-category-sort-status/TicketSort";
import "./BottomHeader.css";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({});

const BottomHeader = ({ tickets, getTickets, currentUser }) => {
  const [unanswerdT, setUnanswerdT] = useState([]);
  const [unclosedT, setUnclosedT] = useState([]);
  const [unassignedT, setUnassignedT] = useState([]);
  const [assignedToCurrentUserT, setAssignedToCurrentUserT] = useState([]);
  const [closedT, setClosedT] = useState([]);
  const filterTickets = () => {
    const unansweredTickets = tickets.filter(
      (ticket) => ticket.messageHistory.length === 0
    );
    setUnanswerdT(unansweredTickets);
    const unclosedTickets = tickets.filter(
      (ticket) => ticket.status === "new" || ticket.status === "assigned"
    );
    setUnclosedT(unclosedTickets);
    const closedTickets = tickets.filter(
      (ticket) => ticket.status === "closed" || ticket.status === "assigned"
    );
    setClosedT(closedTickets);
    const unassignedTickets = tickets.filter(
      (ticket) => ticket.assignedTo === ""
    );
    setUnassignedT(unassignedTickets);
    const assignedToCurrentUserTickets = tickets.filter(
      (ticket) => ticket.assignedTo === currentUser._id
    );
    setAssignedToCurrentUserT(assignedToCurrentUserTickets);
  };

  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets]);

  return (
    <div className="main__cards mt-5">
      <div className="card">
        <img
          src="https://cdn.jitbit.com/helpdesk/images/newtickets.png"
          alt=""
          style={{ width: "30px" }}
        />
        <div className="card_inner">
          <p className="text-primary-p">Unanswered Tickets</p>
          <span className="font-bold text-title">
            {tickets && unanswerdT.length}
          </span>
        </div>
      </div>

      <div className="card">
        <img
          src="https://cdn.jitbit.com/helpdesk/images/inprogresstickets.png"
          alt=""
          style={{ width: "30px" }}
        />
        <div className="card_inner">
          <p className="text-primary-p">Unclosed Tickets</p>
          <span className="font-bold text-title">
            {tickets && unclosedT.length}
          </span>
        </div>
      </div>

      {/*  <div className="card">
        <div className="card_inner">
          <p className="text-primary-p">Unassigned Tickets</p>
          <span className="font-bold text-title">
            {tickets && unassignedT.length}
          </span>
        </div>
      </div> */}
      {/* {console.log(currentUser, " current user")} */}
      {/* {currentUser.role === "admin" || currentUser.role === "support-team" ? (
        <div className="card">
          <div className="card_inner">
            <p className="text-primary-p">Assigned to you</p>
            <span className="font-bold text-title">
              {console.log(
                assignedToCurrentUserT.length,
                "assigned to current user"
              )}
              {tickets && assignedToCurrentUserT.length}
            </span>
          </div>
        </div>
      ) : (
        ""
      )} */}
      <div className="card">
        <img
          src="https://cdn.jitbit.com/helpdesk/images/resolvedtickets.png"
          alt=""
          style={{ width: "30px" }}
        />
        <div className="card_inner">
          <p className="text-primary-p">Closed Tickets</p>
          <span className="font-bold text-title">
            {tickets && closedT.length}
          </span>
        </div>
      </div>
      <div className="card">
        <img
          src="https://cdn.jitbit.com/helpdesk/images/totaltickets.png"
          alt=""
          style={{ width: "30px" }}
        />
        <div className="card_inner">
          <p className="text-primary-p">All Tickets</p>
          <span className="font-bold text-title">
            {tickets && tickets.length}
          </span>
        </div>
      </div>
      <div className="sort-tickets">
        <span>Sort Tickets By</span>
        <TicketSort />
      </div>
    </div>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BottomHeader));
