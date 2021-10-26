import React, { useEffect, useState } from "react";
import "./TopHeader.css";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const TopHeader = ({ location }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:3004/users/me", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const fetchedCurrentUser = await response.json();
        console.log("current User", fetchedCurrentUser);
        setCurrentUser(fetchedCurrentUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [location.pathname]);
  return (
    <div className="top-header">
      {/*   {currentUser && console.log("currUser", currentUser)} */}
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
            {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default withRouter(TopHeader);
