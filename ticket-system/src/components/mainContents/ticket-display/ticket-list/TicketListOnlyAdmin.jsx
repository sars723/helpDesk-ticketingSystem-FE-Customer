import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setTicketsOnlyAdminAction } from "../../../../redux/actions";

import TicketOnlyAdmin from "./tickets/TicketOnlyAdmin";

const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});

const TicketList = ({ searchQuery, getTickets, tickets }) => {
  console.log(searchQuery);

  useEffect(async () => {
    getTickets();
  }, []);
  return (
    <div className="ticket-list mt-5">
      {/*  {tickets.length > 0 && console.log("tick=", tickets[0].subject)} */}
      {tickets.length > 0 &&
        tickets
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
