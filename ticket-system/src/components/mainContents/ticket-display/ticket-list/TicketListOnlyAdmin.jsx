import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setTicketsOnlyAdminAction } from "../../../../redux/actions";

import TicketOnlyAdmin from "./tickets/TicketOnlyAdmin";

const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser.currentUser,
  sortKeys: state.sortingKey,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});

const TicketList = ({ searchQuery, getTickets, tickets, sortKeys }) => {
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
    <div className="ticket-list mt-5">
      {/*  {tickets.length > 0 && console.log("tick=", tickets[0].subject)} */}
      {sortedTickets &&
        sortedTickets
          .filter((ticket, i) =>
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((ticket, i) => (
            <TicketOnlyAdmin key={i} ticket={ticket} i={i} />
          ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
