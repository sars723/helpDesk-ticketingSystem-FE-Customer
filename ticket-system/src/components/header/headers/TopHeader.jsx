import React, { useEffect, useState } from "react";
import "./TopHeader.css";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { setCurrentUserAction } from "../../../redux/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});
const TopHeader = ({ location, getCurrentUser, currentUser }) => {
  const uploadAvatar = async () => {
    /*  try {
      const response = await fetch("http://localhost:3004/users/me/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(),
      });
      if (response.ok) {
        alert("avatar uploaded successfully");
      } else {
        alert("sth wrong with uploading avatar");
      }
    } catch (error) {} */
    getCurrentUser();
  };
  useEffect(() => {
    getCurrentUser();
    uploadAvatar();
  }, [location.pathname]);

  return (
    <div className="top-header">
      <div className="logo">
        <a href="#">
          <span className="logo-title">HelpDeskTS</span>
        </a>
      </div>
      <div className="user-info">
        <Dropdown className="loged-user-info" autoClose={true}>
          <Dropdown.Toggle>
            <i className="fas fa-user mr-2"></i>

            <span className="user-email-address">
              {location.pathname === "/login" ||
              location.pathname === "/register"
                ? "user@xxxx.xxx"
                : currentUser && currentUser.email}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu autoBlur={true}>
            <Dropdown.Item href="#">
              <Link to="/profile" className="dropdown-item nav-link">
                <img
                  src={currentUser.avatar}
                  style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                  alt=""
                  onClick={uploadAvatar}
                />

                <span className="ml-1">Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#">
              {" "}
              {location.pathname === "/register" ? (
                <Link to="/login" className="dropdown-item nav-link">
                  <span className="ml-2 ">Sign Up</span>
                </Link>
              ) : location.pathname === "/login" ? (
                <Link to="/" className="dropdown-item nav-link">
                  <span className="ml-2 ">Log In</span>
                </Link>
              ) : (
                <Link to="/login" className="dropdown-item nav-link">
                  <span className="ml-2 "> Log Out</span>
                </Link>
              )}
            </Dropdown.Item>
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
