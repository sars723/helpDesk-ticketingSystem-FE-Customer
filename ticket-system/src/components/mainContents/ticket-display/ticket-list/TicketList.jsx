import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setTicketsAction } from "../../../../redux/actions";
import Ticket from "./tickets/Ticket";

const mapStateToProps = (state) => ({
  tickets: state.ticket.tickets,
  searchQuery: state.searchValue.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsAction()),
});

const TicketList = ({ searchQuery, getTickets, tickets }) => {
  console.log(searchQuery);

  useEffect(async () => {
    getTickets();
  }, []);
  return (
    <div className="ticket-list mt-5">
      {tickets.length > 0 && console.log("tick=", tickets[0].subject)}
      {tickets.length > 0 &&
        tickets
          .filter((ticket, i) =>
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((ticket, i) => <Ticket key={i} ticket={ticket} />)}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
