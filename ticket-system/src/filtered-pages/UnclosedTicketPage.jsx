import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../components/mainContents/left-sidebar/LeftSidebar";
import TicketHeader from "../components/mainContents/ticket-display/ticket-list/TicketHeader";
import TicketOnlyAdmin from "../components/mainContents/ticket-display/ticket-list/tickets/TicketOnlyAdmin";
import { setTicketsOnlyAdminAction } from "../redux/actions";

const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser.currentUser,
  sortKeys: state.sortingKey,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});
const UnclosedTicketPage = ({ searchQuery, getTickets, tickets, sortKeys }) => {
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
          <TicketHeader />
          <div className="ticket-list mt-5">
            {/*  {tickets.length > 0 && console.log("tick=", tickets[0].subject)} */}
            {sortedTickets &&
              sortedTickets
                .filter(
                  (ticket, i) =>
                    ticket.subject
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) &&
                    ticket.status === "new"
                )
                .map((ticket, i) => (
                  <TicketOnlyAdmin key={i} ticket={ticket} i={i} />
                ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UnclosedTicketPage);
