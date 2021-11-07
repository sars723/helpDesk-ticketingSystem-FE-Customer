import React, { useState, useEffect } from "react";
import "./TicketCategories.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCurrentUserAction,
  setTicketsAction,
  setTicketsOnlyAdminAction,
} from "../../../../redux/actions";
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});
const TicketCategories = ({
  tickets,
  getTickets,
  currentUser,
  getCurrentUser,
}) => {
  const [generalIssueCT, setGeneralIssueCT] = useState([]);
  const [paymentIssueCT, setPaymentIssueCT] = useState([]);
  const [HardwareIssueCT, setHardwareIssueCT] = useState([]);
  const [softwareIssueCT, setSoftwareIssueCT] = useState([]);

  const filterCategories = () => {
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
  };

  useEffect(() => {
    getCurrentUser();
    getTickets();
    filterCategories();
  }, []);
  useEffect(() => {
    filterCategories();
  }, [tickets]);
  /*  console.log("tickets ticket categoriess", tickets); */
  return (
    <div className="ticket-categories ">
      <div className="ticket-categories-title">
        <p>Ticket Categories</p>
      </div>
      <div className="categories">
        {(currentUser && currentUser.role === "admin") ||
        (currentUser && currentUser.role === "support-team") ? (
          <ul>
            <li className="category">
              <Link to="/" className="nav-link">
                <p>All categories</p>
              </Link>

              <p>{tickets && tickets.length}</p>
            </li>
            <ul>
              <li className="category">
                <Link
                  to="/generalSalesCategoryTicketsAdmin"
                  className="nav-link"
                >
                  <p>General Sales</p>
                </Link>{" "}
                <p>{tickets && generalIssueCT.length}</p>
              </li>
              <li className="category">
                <Link
                  to="/paymentIssueCategoryTicketsAdmin"
                  className="nav-link"
                >
                  <p>Payment Issue</p>
                </Link>{" "}
                <p>{tickets && paymentIssueCT.length}</p>
              </li>
              <li className="category">
                <Link
                  to="/hardwareIssueCategoryTicketsAdmin"
                  className="nav-link"
                >
                  <p>Hardware Issue</p>
                </Link>{" "}
                <p>{tickets && HardwareIssueCT.length}</p>
              </li>
              <li className="category">
                <Link
                  to="/softwareIssueCategoryTicketsAdmin"
                  className="nav-link"
                >
                  <p>Software Issue</p>
                </Link>{" "}
                <p>{tickets && softwareIssueCT.length}</p>
              </li>
            </ul>
          </ul>
        ) : (
          <ul>
            <li className="category">
              <Link to="/" className="nav-link">
                <p>All categories</p>
              </Link>

              <p>{tickets && tickets.length}</p>
            </li>
            <ul>
              <li className="category">
                <Link
                  to="/generalSalesCategoryTicketsUser"
                  className="nav-link"
                >
                  <p>General Sales</p>
                </Link>{" "}
                <p>{tickets && generalIssueCT.length}</p>
              </li>
              <li className="category">
                <Link
                  to="/paymentIssueCategoryTicketsUser"
                  className="nav-link"
                >
                  <p>Payment Issue</p>
                </Link>{" "}
                <p>{tickets && paymentIssueCT.length}</p>
              </li>
              <li className="category">
                <Link
                  to="/hardwareIssueCategoryTicketsUser"
                  className="nav-link"
                >
                  <p>Hardware Issue</p>
                </Link>{" "}
                <p>{tickets && HardwareIssueCT.length}</p>
              </li>
              <li className="category">
                <Link
                  to="/softwareIssueCategoryTicketsUser"
                  className="nav-link"
                >
                  <p>Software Issue</p>
                </Link>{" "}
                <p>{tickets && softwareIssueCT.length}</p>
              </li>
            </ul>
          </ul>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketCategories);
