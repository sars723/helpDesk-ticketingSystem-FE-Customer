import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { setCurrentUserAction } from "../../../redux/actions";
import "./BottomHeader.css";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});

const BottomHeader = ({ location, tickets, getTickets, currentUser }) => {
  const [unanswerdT, setUnanswerdT] = useState([]);
  const [unclosedT, setUnclosedT] = useState([]);
  const [unassignedT, setUnassignedT] = useState([]);
  const [assignedToCurrentUserT, setAssignedToCurrentUserT] = useState([]);

  const allClass = location.pathname === "/" ? "active" : "";
  const unansweredClass = location.pathname.match(/^\/unanswered/)
    ? "active"
    : "";
  const unclosedClass = location.pathname.match(/^\/unclosed/) ? "active" : "";
  const unassignedClass = location.pathname.match(/^\/unassigned/)
    ? "active"
    : "";
  const assignedToYouClass = location.pathname.match(
    /^\/assignedToCurrentAgent/
  )
    ? "active"
    : "";
  const filterTickets = () => {
    let unansweredTickets = tickets.filter(
      (ticket) => ticket.messageHistory.length === 0
    );
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
      (ticket) => ticket.assignedTo === currentUser._id
    );
    setAssignedToCurrentUserT(assignedToCurrentUserTickets);
    getTickets();
  };

  useEffect(() => {
    getTickets();
    filterTickets();
  }, []);

  return (
    <div className="bottom-header">
      {(currentUser && currentUser.role === "admin") ||
      (currentUser && currentUser.role === "support-team") ? (
        <ul className="bottom-header-ticket-menu">
          <li className={unansweredClass}>
            <Link className="nav-link " to="/unansweredTicketsAdmin">
              Unanswered <span>({tickets && unanswerdT.length})</span>
            </Link>
          </li>
          <li className={unclosedClass}>
            <Link className="nav-link " to="/unclosedTicketsAdmin">
              Unclosed <span>({tickets && unclosedT.length})</span>
            </Link>
          </li>
          <li className={unassignedClass}>
            <Link className="nav-link " to="/unassignedTicketsAdmin">
              Unassigned <span>({tickets && unassignedT.length})</span>
            </Link>
          </li>
          <li className={assignedToYouClass}>
            <Link
              className="nav-link "
              to="/assignedToCurrentAgentTicketsAdmin"
            >
              Assigned to you{" "}
              {/*  {console.log(assignedToCurrentUserT, "lengthhhhhhhhh")} */}
              <span>({tickets && assignedToCurrentUserT.length})</span>
            </Link>
          </li>{" "}
          <li className={allClass}>
            <Link className="nav-link " to="/">
              All <span>({tickets && tickets.length})</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="bottom-header-ticket-menu">
          <li className={unansweredClass}>
            <Link className="nav-link " to="/unansweredTicketsUser">
              Unanswered <span>({tickets && unanswerdT.length})</span>
            </Link>
          </li>
          <li className={unclosedClass}>
            <Link className="nav-link " to="/unclosedTicketsUser">
              Unclosed <span>{tickets && unclosedT.length}</span>
            </Link>
          </li>
          <li className={unassignedClass}>
            <Link className="nav-link " to="/unassignedTicketsUser">
              Unassigned <span>({tickets && unassignedT.length})</span>
            </Link>
          </li>
          <li className={allClass}>
            <Link className="nav-link " to="/">
              All <span>({tickets && tickets.length})</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BottomHeader));
