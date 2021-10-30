import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { setTicketsOnlyAdminAction } from "../../../redux/actions";
import "./BottomHeader.css";

const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});

const BottomHeader = ({ history, tickets, getTickets, currentUser }) => {
  const [unanswerdT, setUnanswerdT] = useState([]);
  const [unclosedT, setUnclosedT] = useState([]);
  const [unassignedT, setUnassignedT] = useState([]);
  const [assignedToCurrentUserT, setAssignedToCurrentUserT] = useState([]);

  const filterTickets = () => {
    let unansweredTickets = tickets.filter(
      (ticket) => ticket.messageHistory.length === 0
    );
    /*   console.log("generalissueCategoryticket", tickets); */
    setUnanswerdT(unansweredTickets);
    const unclosedTickets = tickets.filter(
      (ticket) => ticket.status === "new" || ticket.status === "assigned"
    );
    setUnclosedT(unclosedTickets);
    const unassignedTickets = tickets.filter(
      (ticket) => ticket.assignedTo === ""
    );
    setUnassignedT(unassignedTickets);
    const assignedToCurrentUserTickets = tickets.filter(
      (ticket) => ticket.sender._id === currentUser._id
    );
    setAssignedToCurrentUserT(assignedToCurrentUserTickets);
  };

  useEffect(() => {
    getTickets();
    filterTickets();
  }, []);

  return (
    <div className="bottom-header">
      <ul className="bottom-header-ticket-menu">
        <li className="active">
          <Link className="nav-link" to="/unclosedTickets">
            Unanswered <span>{tickets && unanswerdT.length}</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/unclosedTickets">
            Unclosed <span>{tickets && unclosedT.length}</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/unassignedTickets">
            Unassigned <span>{tickets && unassignedT.length}</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/assignedToCurrentAgentTickets">
            Assigned to you{" "}
            <span>{tickets && assignedToCurrentUserT.length}</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/">
            All <span>{tickets && tickets.length}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BottomHeader));
