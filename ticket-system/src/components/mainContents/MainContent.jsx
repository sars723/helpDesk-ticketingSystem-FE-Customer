/* import React, { useEffect } from "react";
import "./MainContent.css";
import LeftSidebar from "./left-sidebar/LeftSidebar";
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
  location,
  getCurrentUser,
  getMyTickets,
  getTickets,
  tickets,
  myTickets,
}) => {
  useEffect(() => {
    getCurrentUser();
    if (currentUser.role === "admin") {
      getTickets();
    }
    getMyTickets();
  }, []);
  return (
    <div className="" style={{ margin: "20px 50px" }}>
      <div className="row mt-4">
        <LeftSidebar />
        <div className="  col-12 col-lg-9 ">
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
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainContent));
 */

import React, { useEffect } from "react";
import "./MainContent.css";
import LeftSidebar from "./left-sidebar/LeftSidebar";
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
  location,
  getCurrentUser,
  getMyTickets,
  getTickets,
  tickets,
  myTickets,
}) => {
  useEffect(() => {
    getCurrentUser();
    if (currentUser.role === "admin") {
      getTickets();
    }
    getMyTickets();
  }, []);
  return (
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
        {/* </div> */}
        {/*  </div> */}
      </div>
    </main>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainContent));
