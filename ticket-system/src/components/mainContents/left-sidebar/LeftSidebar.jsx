import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setCurrentUserAction,
  setTicketsAction,
  setTicketsOnlyAdminAction,
} from "../../../redux/actions";
import "./LeftSidebar.css";
import TicketCategories from "./ticket-category-sort-status/TicketCategories";
import TicketSort from "./ticket-category-sort-status/TicketSort";
import TicketStatus from "./ticket-category-sort-status/TicketStatus";
const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  myTickets: state.ticket.tickets,
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
  getMyTickets: () => dispatch(setTicketsAction()),
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});
const LeftSidebar = ({
  getTickets,
  getMyTickets,
  getCurrentUser,
  tickets,
  myTickets,
  currentUser,
}) => {
  useEffect(() => {
    getCurrentUser();
    getTickets();
    getMyTickets();
  }, []);
  /*  console.log(currentUser, "curenttttttttttttttUserrrrrrrrrrr"); */
  return (
    <div className="col-12 col-md-3">
      {(currentUser && currentUser.role === "admin") ||
      (currentUser && currentUser.role === "support-team") ? (
        <TicketCategories tickets={tickets} getTickets={getTickets} />
      ) : (
        <TicketCategories tickets={myTickets} getTickets={getMyTickets} />
      )}
      <TicketSort />
      <TicketStatus />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
