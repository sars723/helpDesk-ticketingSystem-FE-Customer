import React, { useEffect, useState } from "react";
import "./TicketDetail.css";
import { Button, Form } from "react-bootstrap";
import { Next } from "react-bootstrap/esm/PageItem";
const TicketDetail = () => {
  const [editTicketDetail, setEditTicketDetail] = useState({
    priority: false,
    category: false,
    From: false,
    assignedTo: false,
    date: false,
  });
  useEffect(() => {
    try {
      /* const response = await; */
    } catch (error) {
      Next(error);
    }
  }, []);
  return (
    <div className="ticket-detail container-fluid">
      <div className="row  ">
        <div className="col-md-8 pr-5">
          <div className="ticket-detail-content">
            <div className="ticket-detail-content-header">
              <Button className="btn-reply">
                <i className="fa fa-reply"></i>
              </Button>
              <Button className="btn-takeover">Takeover</Button>
              <Button className="btn-close">
                <i className="fa fa-check"></i>Close ticket
              </Button>
            </div>
            <div className="ticket-detail-content-text">
              <h6>Ticket Title</h6>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid odit placeat nemo! Animi iste soluta similique natus
                culpa explicabo, ducimus quia quasi officia magni esse
                molestiae, corporis deserunt est repellat!
              </p>
              <Form.Control
                type="text"
                className="ticket-detail-form-control"
                placeholder="Reply..."
              />
            </div>
          </div>
          <div className="ticket-detail-replay"></div>
        </div>
        <div className="col-md-4 pl-4 ticket-detail-status">
          <div className="ticket-detail-status-header">
            <p className="mb-0">Details</p>
          </div>
          <div className="ticket-detail-status-content">
            {!editTicketDetail.priority ? (
              <div className="row">
                <div className="col-3 p-0">
                  <p>priority</p>
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <p>Priority</p>{" "}
                  <Button
                    onClick={() => setEditTicketDetail({ priority: true })}
                  >
                    •••
                  </Button>
                </div>
              </div>
            ) : (
              <Form.Group>
                <div className="row">
                  <div className="col-3 p-0">
                    <Form.Label>Priority</Form.Label>
                  </div>
                  <div className="col-9 d-flex justify-content-between">
                    <Form.Control as="select">
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Crucial">Crucial</option>
                    </Form.Control>
                    <Button
                      onClick={() => {
                        setEditTicketDetail({ priority: false });
                      }}
                    >
                      Ok
                    </Button>
                  </div>
                </div>{" "}
              </Form.Group>
            )}

            <div className="row ">
              <div className="col-3 p-0">
                <p>Category:</p>
              </div>
              <div className="col-9  d-flex justify-content-between">
                <p>Category</p> <Button>•••</Button>
              </div>
            </div>
            <div className="row">
              <div className="col-3 p-0">
                <p>From:</p>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <p>user</p> <Button>•••</Button>
              </div>
            </div>
            <div className="row">
              <div className="col-3 p-0">
                <p>Assigned To:</p>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <p>Agent</p> <Button>•••</Button>
              </div>
            </div>
            <div className="row">
              <div className="col-3 p-0">
                <p>Date:</p>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <p>Created At</p> <Button>•••</Button>
              </div>
            </div>
            <div className="row">
              <div className="col-3 p-0">
                <p>From</p>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <p>user</p> <Button>•••</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
