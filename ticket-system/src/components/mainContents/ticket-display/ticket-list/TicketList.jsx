import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { setTicketsAction } from "../../../../redux/actions";
import Ticket from "./tickets/Ticket";
import { Table } from "react-bootstrap";

const mapStateToProps = (state) => ({
  tickets: state.ticket.tickets,
  searchQuery: state.searchValue.searchQuery,
  sortKeys: state.sortingKey,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsAction()),
});

const TicketList = ({ searchQuery, getTickets, tickets, sortKeys }) => {
  console.log(searchQuery);
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

  useEffect(() => {
    sortTickets(sortKey, ascending);
  }, [tickets]);
  return (
    <>
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
            {sortedTickets && sortedTickets.length !== 0 ? (
              sortedTickets
                .filter((ticket, i) =>
                  ticket.subject
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map(
                  (ticket, i) =>
                    ticket && <Ticket key={i} ticket={ticket} i={i} />
                )
            ) : (
              <Alert variant="info" style={{ margin: "20px" }}>
                no ticket to show!
              </Alert>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
