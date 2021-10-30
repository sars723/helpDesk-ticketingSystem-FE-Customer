import React from "react";
import "./TicketDisplay.css";
import TicketHeader from "./ticket-list/TicketHeader";
import TicketList from "./ticket-list/TicketList";
import { connect } from "react-redux";
import TicketListOnlyAdmin from "./ticket-list/TicketListOnlyAdmin";
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const TicketDisplay = ({ currentUser }) => {
  console.log(currentUser.role, "current user from ticket display");
  return (
    <div className=" ticket-display col-12 col-md-9">
      <TicketHeader />
      {currentUser.role === "admin" ? <TicketListOnlyAdmin /> : <TicketList />}
    </div>
  );
};

export default connect(mapStateToProps)(TicketDisplay);
