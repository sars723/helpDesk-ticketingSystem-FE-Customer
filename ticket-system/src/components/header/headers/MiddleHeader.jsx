import React, { useState } from "react";
import "./MiddleHeader.css";
import { Form, FormControl, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setSearchValueAction } from "../../../redux/actions/index.js";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchQuery: (searchQuery) => {
    dispatch(setSearchValueAction(searchQuery));
  },
});
const MiddleHeader = ({ searchQuery, setSearchQuery, currentUser }) => {
  /* const [searchQuery, setSearchQuery] = useState(""); */
  return (
    <div className="middle-header">
      <Nav className="mr-auto">
        <Link to="/" className="nav-link">
          <i className="fa fa-inbox"></i>Tickets
        </Link>

        {currentUser.role === "admin" ? (
          <>
            <Link to="/reports" className="nav-link">
              <i className="far fa-chart-bar"></i>Reports
            </Link>
            <Link to="/manageUsers" className="nav-link">
              <i className="fa fa-fw fa-users mr-2"></i>ManageUsers
            </Link>
            <Link to="/addUsers" className="nav-link">
              <i className="fa fa-fw fa-plus"></i>Add Users
            </Link>
          </>
        ) : currentUser.role === "support-team" ? (
          <Link to="/addUsers" className="nav-link">
            <i className="fa fa-fw fa-plus"></i>Add Users
          </Link>
        ) : (
          ""
        )}
      </Nav>
      <div className="left-newTicket-search ">
        <Link
          to="/newTicket"
          className="new-ticket-btn  d-flex align-items-center"
        >
          <i className="fa fa-plus-square"></i>New ticket
        </Link>
        <Form inline className="search">
          <Button variant="outline-success">
            <i className="fa fa-search"></i>
          </Button>
          <FormControl
            type="text"
            placeholder="Search"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MiddleHeader);
