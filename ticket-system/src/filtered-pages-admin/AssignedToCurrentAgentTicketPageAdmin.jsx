import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../components/mainContents/left-sidebar/LeftSidebar";
import TicketOnlyAdmin from "../components/mainContents/ticket-display/ticket-list/tickets/TicketOnlyAdmin";
import { setTicketsOnlyAdminAction } from "../redux/actions";
import { Table } from "react-bootstrap";
const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser,
  sortKeys: state.sortingKey,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});
const AssignedToCurrentAgentTicketPage = ({
  searchQuery,
  getTickets,
  tickets,
  currentUser,
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
  /*  console.log(sortedTickets, "ascending"); */
  return (
    <div className="" style={{ margin: "20px 100px" }}>
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
                        ticket.assignedTo === currentUser._id
                    )
                    .map((ticket, i) => (
                      <TicketOnlyAdmin key={i} ticket={ticket} i={i} />
                    ))}
              </tbody>
            </Table>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedToCurrentAgentTicketPage);