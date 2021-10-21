import React from "react";
import "./TopHeader.css";
import { Dropdown } from "react-bootstrap";

const TopHeader = () => {
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
            <span className="user-email-address">user@gmail.com</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopHeader;
