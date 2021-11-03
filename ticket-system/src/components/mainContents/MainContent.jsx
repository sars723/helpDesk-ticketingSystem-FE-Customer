import React from "react";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import { connect } from "react-redux";
import TicketList from "./ticket-display/ticket-list/TicketList";
import TicketListOnlyAdmin from "./ticket-display/ticket-list/TicketListOnlyAdmin";
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const MainContent = ({ currentUser }) => {
  return (
    <div className="" style={{ margin: "20px 50px" }}>
      <div className="row mt-4">
        <LeftSidebar />
        <div className=" ticket-display col-12 col-md-9 ">
          {currentUser.role === "admin" ? (
            <TicketListOnlyAdmin />
          ) : (
            <TicketList />
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(MainContent);
