import React, { useEffect, useState } from "react";
import "./TopHeader.css";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { setCurrentUserAction } from "../../../redux/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});
const TopHeader = ({ location, getCurrentUser, currentUser }) => {
  useEffect(() => {
    getCurrentUser();
  }, [location.pathname]);

  return (
    <div className="top-header">
      <div className="logo">
        <a href="#">
          <span className="logo-title">strive Helpdesk</span>
        </a>
      </div>
      <div className="user-info">
        <Dropdown className="loged-user-info">
          <Dropdown.Toggle variant="" id="dropdown-basic">
            <i className="fas fa-user mr-2"></i>
            <span className="user-email-address">
              {location.pathname === "/login" ||
              location.pathname === "/register"
                ? "user@xxxx.xxx"
                : currentUser && currentUser.email}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {location.pathname === "/register" ? (
              <Link to="/login" href="#/action-1" className="dropdown-item">
                Sign Up
              </Link>
            ) : location.pathname === "/login" ? (
              <Link to="/" href="#/action-1" className="dropdown-item">
                Log In
              </Link>
            ) : (
              <Link to="/login" href="#/action-1" className="dropdown-item">
                Log Out
              </Link>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
