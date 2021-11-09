import React, { useState, useEffect } from "react";
import "./MainContent.css";
import { connect } from "react-redux";
import TicketList from "./ticket-display/ticket-list/TicketList";
import TicketListOnlyAdmin from "./ticket-display/ticket-list/TicketListOnlyAdmin";
import {
  setCurrentUserAction,
  setTicketsAction,
  setTicketsOnlyAdminAction,
} from "../../redux/actions";
import { withRouter } from "react-router";
import BottomHeader from "../header/headers/BottomHeader";

import NavBar from "../navbar/NavBar";
import Sidebar from "../sidebar/Sidebar";
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
const MainContent = ({
  currentUser,
  getCurrentUser,
  getMyTickets,
  getTickets,
  tickets,
  myTickets,
}) => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  useEffect(() => {
    getCurrentUser();
    if (currentUser.role === "admin") {
      getTickets();
    }
    getMyTickets();
  }, []);
  return (
    <div className="container-fluid px-0">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main>
        <div className="main__container">
          {(currentUser && currentUser.role === "admin") ||
          (currentUser && currentUser.role === "support-team") ? (
            <BottomHeader tickets={tickets} getTickets={getTickets} />
          ) : (
            <BottomHeader tickets={myTickets} getTickets={getMyTickets} />
          )}

          {currentUser.role === "admin" ? (
            <TicketListOnlyAdmin />
          ) : (
            <TicketList />
          )}
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainContent));
