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
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
});
const HardwareIssueCategoryTicketPage = ({
  searchQuery,
  getTickets,
  tickets,
}) => {
  console.log(searchQuery);

  useEffect(async () => {
    getTickets();
  }, []);
  return (
    <div className="" style={{ margin: "20px 50px" }}>
      <div className="row mt-4">
        <LeftSidebar />
        <div className=" ticket-display col-12 col-md-9">
          <TicketHeader />
          <div className="ticket-list mt-5">
            {/*  {tickets.length > 0 && console.log("tick=", tickets[0].subject)} */}
            {tickets.length > 0 &&
              tickets
                .filter(
                  (ticket, i) =>
                    ticket.subject
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) &&
                    ticket.category === "Hardware Issue"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HardwareIssueCategoryTicketPage);
