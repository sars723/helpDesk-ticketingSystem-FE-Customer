import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/helpDeskLogo.png";

import {
  setCurrentUserAction,
  setTicketsAction,
  setTicketsOnlyAdminAction,
} from "../../redux/actions";
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  tickets: state.ticketAdminOnly.tickets,
  myTickets: state.ticket.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
  getTickets: () => dispatch(setTicketsOnlyAdminAction()),
  getMyTickets: () => dispatch(setTicketsAction()),
});
const Sidebar = ({
  sidebarOpen,
  closeSidebar,
  tickets,
  getTickets,
  currentUser,
  getCurrentUser,
  myTickets,
  getMyTickets,
}) => {
  const [generalIssueCT, setGeneralIssueCT] = useState([]);
  const [paymentIssueCT, setPaymentIssueCT] = useState([]);
  const [HardwareIssueCT, setHardwareIssueCT] = useState([]);
  const [softwareIssueCT, setSoftwareIssueCT] = useState([]);
  const [unanswerdT, setUnanswerdT] = useState([]);
  const [unclosedT, setUnclosedT] = useState([]);
  const [unassignedT, setUnassignedT] = useState([]);
  const [assignedToCurrentUserT, setAssignedToCurrentUserT] = useState([]);

  const filterTickets = (tickets) => {
    let generalSalesCategoryTickets = tickets.filter(
      (ticket) => ticket.category == "General Sales"
    );
    /*   console.log("generalissueCategoryticket", tickets); */
    setGeneralIssueCT(generalSalesCategoryTickets);
    const paymentIssueCategoryTickets = tickets.filter(
      (ticket) => ticket.category === "Payment Issue"
    );
    setPaymentIssueCT(paymentIssueCategoryTickets);
    const hardwareIssueCategoryTickets = tickets.filter(
      (ticket) => ticket.category === "Hardware Issue"
    );
    setHardwareIssueCT(hardwareIssueCategoryTickets);
    const softwareIssueCategoryTickets = tickets.filter(
      (ticket) => ticket.category === "Software Issue"
    );
    setSoftwareIssueCT(softwareIssueCategoryTickets);
    let unansweredTickets = tickets.filter(
      (ticket) => ticket.messageHistory.length === 0
    );
    setUnanswerdT(unansweredTickets);
    const unclosedTickets = tickets.filter(
      (ticket) => ticket.status === "new" || ticket.status === "assigned"
    );
    setUnclosedT(unclosedTickets);
    const unassignedTickets = tickets.filter(
      (ticket) => ticket.assignedTo === ""
    );
    setUnassignedT(unassignedTickets);
    const assignedToCurrentUserTickets = tickets.filter(
      (ticket) => ticket.assignedTo === currentUser._id
    );
    setAssignedToCurrentUserT(assignedToCurrentUserTickets);
  };

  useEffect(() => {
    getCurrentUser();

    if (currentUser.role === "admin" || currentUser.role === "support-team") {
      getTickets();
      filterTickets(tickets);
    } else {
      getMyTickets();
      filterTickets(myTickets);
    }
  }, []);
  useEffect(() => {
    if (currentUser.role === "admin" || currentUser.role === "support-team") {
      filterTickets(tickets);
    } else {
      filterTickets(myTickets);
    }
  }, [tickets, myTickets]);
  console.log("ticket for user", myTickets, tickets);
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={Logo} alt="logo" />
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      {(currentUser && currentUser.role === "admin") ||
      (currentUser && currentUser.role === "support-team") ? (
        <div className="sidebar__menu">
          <div className="sidebar__link active_menu_link">
            <Link to="/" className="nav-link">
              <i className="fa fa-inbox mr-2"></i>Tickets
            </Link>
          </div>
          <div className="only-mobile d-none">
            <div className="sidebar__link active_menu_link">
              <Link to="/manageUsers" className="nav-link">
                <i className="fa fa-fw fa-users mr-2"></i>ManageUsers
              </Link>
            </div>
            <div className="sidebar__link active_menu_link">
              <Link to="/addUsers" className="nav-link">
                <i className="fa fa-fw fa-plus mr-2"></i>Add Users
              </Link>
            </div>
            <div className="sidebar__link active_menu_link">
              <Link to="/newTicket" className="nav-link">
                <i className="fa fa-plus-square mr-2"></i>New ticket
              </Link>
            </div>
          </div>
          <h2> Status</h2>
          <div className="sidebar__link">
            <Link className="nav-link " to="/unansweredTicketsAdmin">
              Unanswered <span>({tickets && unanswerdT.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link className="nav-link " to="/unclosedTicketsAdmin">
              Unclosed <span>({tickets && unclosedT.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link className="nav-link " to="/unassignedTicketsAdmin">
              Unassigned <span>({tickets && unassignedT.length})</span>
            </Link>
          </div>

          <div className="sidebar__link">
            <Link
              className="nav-link "
              to="/assignedToCurrentAgentTicketsAdmin"
            >
              Assigned to you{" "}
              <span>({tickets && assignedToCurrentUserT.length})</span>
            </Link>
          </div>

          <div className="sidebar__link">
            <Link className="nav-link " to="/">
              All <span>({tickets && tickets.length})</span>
            </Link>
          </div>
          <h2>Categories</h2>
          <div className="sidebar__link">
            <Link to="/" className="nav-link">
              All categories <span>({tickets && tickets.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link to="/generalSalesCategoryTicketsAdmin" className="nav-link">
              General Sales <span>({tickets && generalIssueCT.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link to="/paymentIssueCategoryTicketsAdmin" className="nav-link">
              Payment Issue <span>({tickets && paymentIssueCT.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link to="/hardwareIssueCategoryTicketsAdmin" className="nav-link">
              Hardware Issue <span>({tickets && HardwareIssueCT.length})</span>
            </Link>
          </div>

          <div className="sidebar__link">
            <Link to="/softwareIssueCategoryTicketsAdmin" className="nav-link">
              Software Issue <span>({tickets && softwareIssueCT.length})</span>
            </Link>
          </div>

          <div className="sidebar__logout mt-0">
            <Link to="/login" className=" nav-link">
              {" "}
              <i className="fa fa-power-off mr-2"></i>
              Log Out
            </Link>
          </div>
        </div>
      ) : (
        <div className="sidebar__menu">
          <div className="sidebar__link active_menu_link">
            <Link to="/" className="nav-link">
              <i className="fa fa-inbox"></i>Tickets
            </Link>
          </div>
          <h2> Status</h2>
          <div className="sidebar__link">
            <Link className="nav-link " to="/unansweredTicketsUser">
              Unanswered <span>({myTickets && unanswerdT.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link className="nav-link " to="/unclosedTicketsUser">
              Unclosed <span>({myTickets && unclosedT.length})</span>
            </Link>
          </div>
          <div className="sidebar__link">
            <Link className="nav-link " to="/unassignedTicketsUser">
              Unassigned <span>({myTickets && unassignedT.length})</span>
            </Link>
          </div>

          <div className="sidebar__link">
            <Link className="nav-link " to="/">
              All <span>({myTickets && myTickets.length})</span>
            </Link>
          </div>
          <h2>Categories</h2>
          <div className="sidebar__link">
            <Link to="/" className="nav-link">
              <p>All categories</p>
            </Link>
            <span>{myTickets && myTickets.length}</span>
          </div>
          <div className="sidebar__link">
            <Link to="/generalSalesCategoryTicketsUser" className="nav-link">
              <p>General Sales</p>
            </Link>
            <span>{myTickets && generalIssueCT.length}</span>
          </div>
          <div className="sidebar__link">
            <Link to="/paymentIssueCategoryTicketsUser" className="nav-link">
              <p>Payment Issue</p>
            </Link>
            <span>{myTickets && paymentIssueCT.length}</span>
          </div>
          <div className="sidebar__link">
            <Link to="/hardwareIssueCategoryTicketsUser" className="nav-link">
              <p>Hardware Issue</p>
            </Link>
            <span>{myTickets && HardwareIssueCT.length}</span>
          </div>

          <div className="sidebar__link">
            <Link to="/softwareIssueCategoryTicketsUser" className="nav-link">
              <p>Software Issue</p>
            </Link>
            <span>{myTickets && softwareIssueCT.length}</span>
          </div>

          <div className="sidebar__logout">
            <Link to="/login" className=" nav-link">
              <p className="ml-2 ">
                {" "}
                <i className="fa fa-power-off"></i> Log Out
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
