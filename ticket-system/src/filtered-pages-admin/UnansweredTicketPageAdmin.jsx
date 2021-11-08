/* import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../components/mainContents/left-sidebar/LeftSidebar";
import TicketOnlyAdmin from "../components/mainContents/ticket-display/ticket-list/tickets/TicketOnlyAdmin";
import { setTicketsOnlyAdminAction } from "../redux/actions";
import { Table } from "react-bootstrap";
const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser.currentUser,
  sortKeys: state.sortingKey,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});
const UnansweredTicketPage = ({
  searchQuery,
  getTickets,
  tickets,
  sortKeys,
}) => {
  const [sortedTickets, setSortedTickets] = useState(null);
  const { sortKey, ascending } = sortKeys;
  const sortTickets = (field, sortAsc) => {
    const sortedTickets = sortAsc
      ? [].concat(tickets).sort((a, b) => (a[field] > b[field] ? 1 : -1))
      : [].concat(tickets).sort((a, b) => (a[field] > b[field] ? -1 : 1));
    setSortedTickets(sortedTickets);
  };

  useEffect(async () => {
    getTickets();
    sortTickets(sortKey, ascending);
  }, [sortKey, ascending]);
  return (
    <div className="" style={{ margin: "20px 50px" }}>
      <div className="row mt-4">
        <LeftSidebar />
        <div className=" ticket-display col-12 col-md-9">
          <div className="ticket-list ">
            <Table hover>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Due Date</th>
                  <th>Agent</th>
                  <th>Updated</th>
                  <th>
                    <input type="checkbox" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {sortedTickets &&
                  sortedTickets
                    .filter(
                      (ticket, i) =>
                        ticket.subject
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) &&
                        ticket.messageHistory.length === 0
                    )
                    .map((ticket, i) => (
                      <TicketOnlyAdmin key={i} ticket={ticket} i={i} />
                    ))}
              </tbody>
            </Table>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnansweredTicketPage);
 */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../components/mainContents/left-sidebar/LeftSidebar";
import TicketOnlyAdmin from "../components/mainContents/ticket-display/ticket-list/tickets/TicketOnlyAdmin";
import {
  setCurrentUserAction,
  setTicketsAction,
  setTicketsOnlyAdminAction,
} from "../redux/actions";
import { Table } from "react-bootstrap";
import BottomHeader from "../components/header/headers/BottomHeader";
import NavBar from "../components/navbar/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser,
  sortKeys: state.sortingKey,
  myTickets: state.ticket.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
  getMyTickets: () => dispatch(setTicketsAction()),
});
const UnansweredTicketPage = ({
  searchQuery,
  getCurrentUser,
  getMyTickets,
  getTickets,
  tickets,
  myTickets,
  sortKeys,
  currentUser,
}) => {
  const [sortedTickets, setSortedTickets] = useState(null);
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  const { sortKey, ascending } = sortKeys;
  const sortTickets = (field, sortAsc) => {
    const sortedTickets = sortAsc
      ? [].concat(tickets).sort((a, b) => (a[field] > b[field] ? 1 : -1))
      : [].concat(tickets).sort((a, b) => (a[field] > b[field] ? -1 : 1));
    setSortedTickets(sortedTickets);
  };

  useEffect(async () => {
    /* if (currentUser?.role === "admin") { */
    getTickets();
    /*   } */
    getMyTickets();
    sortTickets(sortKey, ascending);
  }, [sortKey, ascending]);
  useEffect(() => {
    sortTickets(sortKey, ascending);
  }, [tickets]);
  return (
    <div className="container-fluid px-0">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main>
        <div className="main__container">
          {/*  {(currentUser && currentUser.role === "admin") ||
        (currentUser && currentUser.role === "support-team") ? ( */}
          <BottomHeader tickets={tickets} getTickets={getTickets} />
          {/*  ) : (
          <BottomHeader tickets={myTickets} getTickets={getMyTickets} />
        )} */}
          <div className="ticket-list ticket-display mt-3 row ">
            <Table hover>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Due Date</th>
                  <th>Agent</th>
                  <th>Updated</th>
                  <th>
                    <input type="checkbox" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {sortedTickets &&
                  sortedTickets
                    .filter(
                      (ticket, i) =>
                        ticket.subject
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) &&
                        ticket.messageHistory.length === 0
                    )
                    .map((ticket, i) => (
                      <TicketOnlyAdmin key={i} ticket={ticket} i={i} />
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnansweredTicketPage);
