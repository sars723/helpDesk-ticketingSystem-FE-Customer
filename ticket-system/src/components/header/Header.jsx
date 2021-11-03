import React, { useEffect } from "react";
import TopHeader from "./headers/TopHeader";
import MiddleHeader from "./headers/MiddleHeader";
import BottomHeader from "./headers/BottomHeader";
import "./Header.css";
import { withRouter } from "react-router";
import {
  setCurrentUserAction,
  setTicketsAction,
  setTicketsOnlyAdminAction,
} from "../../redux/actions";
import { connect } from "react-redux";
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
const Header = ({
  location,
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
  return (
    <div className="header">
      <TopHeader />
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <>
          <MiddleHeader />

          {(currentUser && currentUser.role === "admin") ||
          (currentUser && currentUser.role === "support-team") ? (
            <BottomHeader tickets={tickets} getTickets={getTickets} />
          ) : (
            <BottomHeader tickets={myTickets} getTickets={getMyTickets} />
          )}
        </>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
