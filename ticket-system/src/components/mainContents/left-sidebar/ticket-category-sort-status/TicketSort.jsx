import React, { useState, useEffect } from "react";
import "./TicketSort.css";
import { Form } from "react-bootstrap";
import { setSortingKeyAction } from "../../../../redux/actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  setSortKey: (sortKey) => dispatch(setSortingKeyAction(sortKey)),
});
const TicketSort = ({ setSortKey }) => {
  const [sortKeys, setSortKeys] = useState({
    sortKey: "priority",
    ascending: true,
  });

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setSortKey(sortKeys);
  }, [sortKeys]);
  return (
    <div className="ticket-sort ">
      <div className="col-12">
        <div className="row align-items-center pb-2">
          <div className="col-9 select-form">
            {
              <Form.Control
                as="select"
                value={sortKeys.sortKey}
                onChange={(e) =>
                  setSortKeys({ ...sortKeys, sortKey: e.target.value })
                }
              >
                <option value="_id">Ticket Number</option>
                <option value="subject">Subject</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="updatedAt">Updated</option>
                <option value="sender">agent</option>
              </Form.Control>
            }
          </div>
          <div className="col-3 px-0 sort-btn">
            <span>
              {sortKeys.ascending ? (
                <button
                  onClick={() => setSortKeys({ ...sortKeys, ascending: false })}
                >
                  A → Z
                </button>
              ) : (
                <button
                  onClick={() => setSortKeys({ ...sortKeys, ascending: true })}
                >
                  Z → A
                </button>
              )}
            </span>
          </div>
        </div>
        {/*  <div className="row">
          <div className="col-12">
            <p>select columns to display...</p>
            <Form.Group>
              <Form.Check
                type="checkbox"
                checked={checked}
                label="Priority"
                onChange={(e) => handleChange("priority", e.target.checked)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" checked={checked} label="Status" onChange={(e)=>handleChange("priority",e.target.checked)} />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                checked={checked}
                label="Updated At"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" checked={checked} label="Agent" onChange={(e)=>handleChange("priority",e.target.checked)} />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                checked={checked}
                label="Created At" onChange={(e)=>handleChange("createdAt",e.target.checked)}
              />
            </Form.Group>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default connect((s) => s, mapDispatchToProps)(TicketSort);
