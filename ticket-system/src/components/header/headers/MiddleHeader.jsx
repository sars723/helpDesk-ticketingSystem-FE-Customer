import React, { useState } from "react";
import "./MiddleHeader.css";
import { Form, FormControl, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MiddleHeader = ({ searchQuery, setSearchQuery }) => {
  /* const [searchQuery, setSearchQuery] = useState(""); */
  return (
    <div className="middle-header">
      <Nav className="mr-auto">
        <Nav.Link href="#home">
          <i className="fa fa-inbox"></i>Tickets
        </Nav.Link>
        <Nav.Link href="#link">
          <i className="far fa-chart-bar"></i>Reports
        </Nav.Link>
        <Nav.Link href="#home">
          <i className="fa fa-cog"></i>Administration
        </Nav.Link>
      </Nav>
      <div className="left-newTicket-search ">
        <Link to="" className="new-ticket-btn  d-flex align-items-center">
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

export default MiddleHeader;
