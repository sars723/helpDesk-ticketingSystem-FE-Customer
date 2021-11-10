import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { setTicketsAction, setTicketsOnlyAdminAction } from "../redux/actions";
import { Table } from "react-bootstrap";
import BottomHeader from "../components/header/headers/BottomHeader";
import Ticket from "../components/mainContents/ticket-display/ticket-list/tickets/Ticket";
import NavBar from "../components/navbar/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
const mapStateToProps = (state) => ({
  tickets: state.ticket.tickets,
  searchQuery: state.searchValue.searchQuery,
  sortKeys: state.sortingKey,
  myTickets: state.ticket.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getMyTickets: () => dispatch(setTicketsAction()),
});
const HardwareIssueCategoryTicketPageUser = ({
  searchQuery,

  getMyTickets,

  tickets,
  myTickets,
  sortKeys,
}) => {
  const [sortedTickets, setSortedTickets] = useState(null);
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  const sortedT = sortedTickets?.filter(
    (ticket, i) => ticket.category === "Hardware Issue"
  );
  const { sortKey, ascending } = sortKeys;
  const sortTickets = (field, sortAsc) => {
    const sortedTickets = sortAsc
      ? [].concat(tickets).sort((a, b) => (a[field] > b[field] ? 1 : -1))
      : [].concat(tickets).sort((a, b) => (a[field] > b[field] ? -1 : 1));
    setSortedTickets(sortedTickets);
  };
  useEffect(async () => {
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
          <BottomHeader tickets={myTickets} getTickets={getMyTickets} />

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
                {sortedTickets && sortedT.length !== 0 ? (
                  sortedTickets
                    .filter(
                      (ticket, i) =>
                        ticket.subject
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) &&
                        ticket.category === "Hardware Issue"
                    )
                    .map((ticket, i) => (
                      <Ticket key={i} ticket={ticket} i={i} />
                    ))
                ) : (
                  <Alert variant="info" style={{ margin: "20px" }}>
                    no ticket to show!
                  </Alert>
                )}
              </tbody>
            </Table>
          </div>
        </div>{" "}
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HardwareIssueCategoryTicketPageUser);
