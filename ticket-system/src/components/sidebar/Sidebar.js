import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logoHelpDesk2.png";

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
      (ticket) => ticket.assignedTo._id === currentUser._id
    );
    setAssignedToCurrentUserT(assignedToCurrentUserTickets);
  };

  useEffect(() => {
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
  /* console.log("ticket for user", myTickets, tickets); */
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
          <div className="sidebar__link ">
            <NavLink
              to="/home"
              className="nav-link"
              activeClassName="active_menu_link"
            >
              <i className="fa fa-inbox mr-2"></i>Tickets
            </NavLink>
          </div>
          <div className="only-mobile d-none">
            <div className="sidebar__link ">
              <NavLink
                activeClassName="active_menu_link"
                to="/manageUsers"
                className="nav-link"
              >
                <i className="fa fa-fw fa-users mr-2"></i>ManageUsers
              </NavLink>
            </div>
            <div className="sidebar__link ">
              <NavLink
                activeClassName="active_menu_link"
                to="/addUsers"
                className="nav-link"
              >
                <i className="fa fa-fw fa-plus mr-2"></i>Add Users
              </NavLink>
            </div>
            <div className="sidebar__link ">
              <NavLink
                activeClassName="active_menu_link"
                to="/newTicket"
                className="nav-link"
              >
                <i className="fa fa-plus-square mr-2"></i>New ticket
              </NavLink>
            </div>
          </div>
          <h2> Status</h2>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/unansweredTicketsAdmin"
            >
              Unanswered <span>({tickets && unanswerdT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/unclosedTicketsAdmin"
            >
              Unclosed <span>({tickets && unclosedT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/unassignedTicketsAdmin"
            >
              Unassigned <span>({tickets && unassignedT.length})</span>
            </NavLink>
          </div>

          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/assignedToCurrentAgentTicketsAdmin"
            >
              Assigned to you{" "}
              <span>({tickets && assignedToCurrentUserT.length})</span>
            </NavLink>
          </div>

          {/*     <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/home"
            >
              All <span>({tickets && tickets.length})</span>
            </NavLink>
          </div> */}
          <h2>Categories</h2>
          {/*    <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/home"
              className="nav-link"
            >
              All categories <span>({tickets && tickets.length})</span>
            </NavLink>
          </div> */}
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/generalSalesCategoryTicketsAdmin"
              className="nav-link"
            >
              General Sales <span>({tickets && generalIssueCT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/paymentIssueCategoryTicketsAdmin"
              className="nav-link"
            >
              Payment Issue <span>({tickets && paymentIssueCT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              to="/hardwareIssueCategoryTicketsAdmin"
              className="nav-link"
              activeClassName="active_menu_link"
            >
              Hardware Issue <span>({tickets && HardwareIssueCT.length})</span>
            </NavLink>
          </div>

          <div className="sidebar__link">
            <NavLink
              to="/softwareIssueCategoryTicketsAdmin"
              className="nav-link"
              activeClassName="active_menu_link"
            >
              Software Issue <span>({tickets && softwareIssueCT.length})</span>
            </NavLink>
          </div>

          <div className="sidebar__logout mt-0">
            <NavLink
              activeClassName="active_menu_link"
              to="/login"
              className=" nav-link"
            >
              {" "}
              <i className="fa fa-power-off mr-2"></i>
              Log Out
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="sidebar__menu">
          <div className="sidebar__link ">
            <NavLink
              activeClassName="active_menu_link"
              to="/home"
              className="nav-link"
            >
              <i className="fa fa-inbox mr-2"></i>Tickets
            </NavLink>
          </div>
          <div className="only-mobile d-none">
            <div className="sidebar__link ">
              <NavLink
                activeClassName="active_menu_link"
                to="/newTicket"
                className="nav-link"
              >
                <i className="fa fa-plus-square mr-2"></i>New ticket
              </NavLink>
            </div>
          </div>
          <h2> Status</h2>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/unansweredTicketsUser"
            >
              Unanswered <span>({myTickets && unanswerdT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/unclosedTicketsUser"
            >
              Unclosed <span>({myTickets && unclosedT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/unassignedTicketsUser"
            >
              Unassigned <span>({myTickets && unassignedT.length})</span>
            </NavLink>
          </div>

          {/*  <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              className="nav-link "
              to="/home"
            >
              All <span>({myTickets && myTickets.length})</span>
            </NavLink>
          </div> */}
          <h2>Categories</h2>
          {/* <div className="sidebar__link">
            <Link
              activeClassName="active_menu_link"
              to="/home"
              className="nav-link"
            >
              <p>All categories</p>
            </Link>
            <span>{myTickets && myTickets.length}</span>
          </div> */}
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/generalSalesCategoryTicketsUser"
              className="nav-link"
            >
              General Sales <span>({myTickets && generalIssueCT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/paymentIssueCategoryTicketsUser"
              className="nav-link"
            >
              Payment Issue <span>({myTickets && paymentIssueCT.length})</span>
            </NavLink>
          </div>
          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/hardwareIssueCategoryTicketsUser"
              className="nav-link"
            >
              Hardware Issue{" "}
              <span>({myTickets && HardwareIssueCT.length})</span>
            </NavLink>
          </div>

          <div className="sidebar__link">
            <NavLink
              activeClassName="active_menu_link"
              to="/softwareIssueCategoryTicketsUser"
              className="nav-link"
            >
              Software Issue{" "}
              <span>({myTickets && softwareIssueCT.length})</span>
            </NavLink>
          </div>

          <div className="sidebar__logout">
            <NavLink
              activeClassName="active_menu_link"
              to="/login"
              className=" nav-link"
            >
              <p className="ml-2 ">
                {" "}
                <i className="fa fa-power-off"></i> Log Out
              </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
