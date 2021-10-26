import React, { useEffect, useState } from "react";
import "./TicketDetailEdit.css";
import { Button, Form } from "react-bootstrap";
const TicketDetailEdit = () => {
  const [editTicketDetail, setEditTicketDetail] = useState({
    priority: false,
    category: false,
    From: false,
    assignedTo: false,
    createdAt: false,
  });
  return (
    <div className="ticket-detail-edit col-md-4 pl-4 ticket-detail-status">
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
                onClick={() =>
                  setEditTicketDetail({
                    priority: true,
                  })
                }
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
                <Form.Control as="select" /* value={} */>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Crucial">Crucial</option>
                </Form.Control>
                <Button
                  onClick={() => {
                    setEditTicketDetail({
                      priority: false,
                    });
                  }}
                >
                  Ok
                </Button>
              </div>
            </div>{" "}
          </Form.Group>
        )}
        {!editTicketDetail.category ? (
          <div className="row ">
            <div className="col-3 p-0">
              <p>Category:</p>
            </div>
            <div className="col-9  d-flex justify-content-between">
              <p>Category</p>{" "}
              <Button
                onClick={() =>
                  setEditTicketDetail({
                    category: true,
                  })
                }
              >
                •••
              </Button>
            </div>
          </div>
        ) : (
          <Form.Group>
            <div className="row">
              <div className="col-3 p-0">
                <Form.Label>Category</Form.Label>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <Form.Control as="select" /* value={} */>
                  <option value="Low">General Issue</option>
                  <option value="Normal">General Sales</option>
                  <option value="High">Payment Issue</option>
                  <option value="Normal">Hardware Issue</option>
                  <option value="High">Software Issue</option>
                </Form.Control>
                <Button
                  onClick={() => {
                    setEditTicketDetail({ category: false });
                  }}
                >
                  Ok
                </Button>
              </div>
            </div>{" "}
          </Form.Group>
        )}
        {!editTicketDetail.user ? (
          <div className="row ">
            <div className="col-3 p-0">
              <p>User:</p>
            </div>
            <div className="col-9  d-flex justify-content-between">
              <p>User</p>{" "}
              <Button
                onClick={() =>
                  setEditTicketDetail({
                    user: true,
                  })
                }
              >
                •••
              </Button>
            </div>
          </div>
        ) : (
          <Form.Group>
            <div className="row">
              <div className="col-3 p-0">
                <Form.Label>User</Form.Label>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <Form.Control as="select" /* value={} */>
                  <option value="yohana-1">Yohana</option>
                  <option value="yafet-2">Yafet</option>
                  <option value="elias-3">Elias</option>
                  <option value="naomi-4">Naomi</option>
                  <option value="kirubel-5">Kirubel</option>
                </Form.Control>
                <Button
                  onClick={() => {
                    setEditTicketDetail({ user: false });
                  }}
                >
                  Ok
                </Button>
              </div>
            </div>{" "}
          </Form.Group>
        )}

        {!editTicketDetail.assignedTo ? (
          <div className="row ">
            <div className="col-3 p-0">
              <p>Assigned To:</p>
            </div>
            <div className="col-9  d-flex justify-content-between">
              <p>Agent</p>{" "}
              <Button
                onClick={() =>
                  setEditTicketDetail({
                    assignedTo: true,
                  })
                }
              >
                •••
              </Button>
            </div>
          </div>
        ) : (
          <Form.Group>
            <div className="row">
              <div className="col-3 p-0">
                <Form.Label>Assigned To</Form.Label>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <Form.Control as="select" /* value={} */>
                  <option value="yohana-1">Yohana</option>
                  <option value="yafet-2">Yafet</option>
                  <option value="elias-3">Elias</option>
                  <option value="naomi-4">Naomi</option>
                  <option value="kirubel-5">Kirubel</option>
                </Form.Control>
                <Button
                  onClick={() => {
                    setEditTicketDetail({ assignedTo: false });
                  }}
                >
                  Ok
                </Button>
              </div>
            </div>{" "}
          </Form.Group>
        )}
        {!editTicketDetail.createdAt ? (
          <div className="row ">
            <div className="col-3 p-0">
              <p>Date:</p>
            </div>
            <div className="col-9  d-flex justify-content-between">
              <p>Created At</p>{" "}
              <Button
                onClick={() =>
                  setEditTicketDetail({
                    createdAt: true,
                  })
                }
              >
                •••
              </Button>
            </div>
          </div>
        ) : (
          <Form.Group>
            <div className="row">
              <div className="col-3 p-0">
                <Form.Label>Date</Form.Label>
              </div>
              <div className="col-9 d-flex justify-content-between">
                <Form.Control
                  type="datetime-local"
                  className="form-control-date"
                />
                <Button
                  onClick={() => {
                    setEditTicketDetail({ createdAt: false });
                  }}
                >
                  Ok
                </Button>
              </div>
            </div>{" "}
          </Form.Group>
        )}
      </div>
    </div>
  );
};

export default TicketDetailEdit;
