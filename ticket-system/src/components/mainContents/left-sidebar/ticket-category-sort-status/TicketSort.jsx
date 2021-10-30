import React, { useState } from "react";
import "./TicketSort.css";
import { Form, FormControl } from "react-bootstrap";
const TicketSort = () => {
  const [ascending, setAcending] = useState(true);
  const [sortValue, setSortValue] = useState("");
  return (
    <div className="ticket-sort ">
      <div className="col-12">
        <div className="row align-items-center">
          <div className="col-9 select-form">
            {
              <Form.Control
                as="select"
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
              >
                <option value="_id">Ticket Number</option>
                <option value="priority" selected>
                  Priority
                </option>
                <option value="status">Status</option>
                <option value="updatedAt">Updated</option>
                <option value="sender">agent</option>
              </Form.Control>
            }
          </div>
          <div className="col-3 px-0 sort-btn">
            <span>
              {ascending ? (
                <button onClick={() => setAcending(false)}>A → Z</button>
              ) : (
                <button onClick={() => setAcending(true)}>Z → A</button>
              )}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>select columns to display...</p>
            <Form.Group>
              <Form.Check type="checkbox" label="Priority" />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Status" />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Tech" />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Updated" />
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSort;
