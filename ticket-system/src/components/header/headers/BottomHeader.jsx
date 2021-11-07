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

const BottomHeader = ({
  location,
  tickets,
  getTickets,
  currentUser,
  getCurrentUser,
}) => {
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
  };

  useEffect(() => {
    getCurrentUser();
    getTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets]);

  return (
    <div className="main__cards">
      <div className="card">
        {/* icon */}
        <div className="card_inner">
          <p className="text-primary-p">Unanswered Tickets</p>
          <span className="font-bold text-title">
            {tickets && unanswerdT.length}
          </span>
        </div>
      </div>

      <div className="card">
        {/* icon */}
        <div className="card_inner">
          <p className="text-primary-p">Unclosed Tickets</p>
          <span className="font-bold text-title">
            {tickets && unclosedT.length}
          </span>
        </div>
      </div>

      <div className="card">
        {/* icon */}
        <div className="card_inner">
          <p className="text-primary-p">Unassigned Tickets</p>
          <span className="font-bold text-title">
            {tickets && unassignedT.length}
          </span>
        </div>
      </div>
      {console.log(currentUser, " current user")}
      {currentUser.role === "admin" || currentUser.role === "support-team" ? (
        <div className="card">
          {/* icon */}

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
      )}

      <div className="card">
        {/* icon */}
        <div className="card_inner">
          <p className="text-primary-p">All Tickets</p>
          <span className="font-bold text-title">
            {tickets && tickets.length}
          </span>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="bottom-header ">
      {(currentUser && currentUser.role === "admin") ||
      (currentUser && currentUser.role === "support-team") ? (
        <ul className="bottom-header-ticket-menu d-flex justify-content-between">
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
    </div> */
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BottomHeader));
