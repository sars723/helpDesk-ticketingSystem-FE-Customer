import React, { useEffect, useState } from "react";
import "./TicketDetailEdit.css";
import { Button, Form } from "react-bootstrap";
const TicketDetailEdit = ({ ticket }) => {
  const [editTicketDetail, setEditTicketDetail] = useState({
    priority: false,
    category: false,
    From: false,
    assignedTo: false,
    createdAt: false,
  });
  const [ticketDetail, setTicketDetail] = useState({
    priority: ticket.priority,
    category: ticket.category,
    sender: ticket.sender,
    assignedTo: ticket.assignedTo,
    createdAt: ticket.createdAt,
  });

  const handleChange = (key, value) => {
    setTicketDetail({
      ...ticketDetail,
      [key]: value,
    });
    console.log(ticketDetail.priority);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", ticketDetail);
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/" + ticket._id,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          body: JSON.stringify(ticketDetail),
          /*  body: JSON.stringify({ ticketDetail }), */
        }
      );
      if (response.ok) {
        alert("ticket updated");
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ticket-detail-edit col-md-4 pl-4 ticket-detail-status">
      <div className="ticket-detail-status-header">
        {console.log(ticketDetail.priority)}
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="row">
                <div className="col-3 p-0">
                  <Form.Label>Priority</Form.Label>
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <Form.Control
                    as="select"
                    value={ticketDetail.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Crucial">Critical</option>
                  </Form.Control>
                  <Button className="btn-submit" type="submit">
                    ok
                  </Button>
                  <Button
                    onClick={() => {
                      setEditTicketDetail({
                        priority: false,
                      });
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>{" "}
            </Form.Group>
          </Form>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="row">
                <div className="col-3 p-0">
                  <Form.Label>Category</Form.Label>
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <Form.Control
                    as="select"
                    value={ticketDetail.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <option value="General Issue">General Issue</option>
                    <option value="General Sales">General Sales</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Hardware Issue">Hardware Issue</option>
                    <option value="Software Issue">Software Issue</option>
                  </Form.Control>
                  <Button className="btn-submit" type="submit">
                    ok
                  </Button>
                  <Button
                    onClick={() => {
                      setEditTicketDetail({ category: false });
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>{" "}
            </Form.Group>
          </Form>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="row">
                <div className="col-3 p-0">
                  <Form.Label>User</Form.Label>
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <Form.Control
                    as="select"
                    value={ticketDetail.sender}
                    onChange={(e) => handleChange("sender", e.target.value)}
                  >
                    <option value="yohana-1">Yohana</option>
                    <option value="yafet-2">Yafet</option>
                    <option value="elias-3">Elias</option>
                    <option value="naomi-4">Naomi</option>
                    <option value="kirubel-5">Kirubel</option>
                  </Form.Control>
                  <Button className="btn-submit" type="submit">
                    ok
                  </Button>
                  <Button
                    onClick={() => {
                      setEditTicketDetail({ user: false });
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>{" "}
            </Form.Group>
          </Form>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="row">
                <div className="col-3 p-0">
                  <Form.Label>Assigned To</Form.Label>
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <Form.Control
                    as="select"
                    value={ticketDetail.assignedTo}
                    onChange={(e) => handleChange("assignedTo", e.target.value)}
                  >
                    <option value="yohana-1">Yohana</option>
                    <option value="yafet-2">Yafet</option>
                    <option value="elias-3">Elias</option>
                    <option value="naomi-4">Naomi</option>
                    <option value="kirubel-5">Kirubel</option>
                  </Form.Control>
                  <Button className="btn-submit" type="submit">
                    ok
                  </Button>
                  <Button
                    onClick={() => {
                      setEditTicketDetail({ assignedTo: false });
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>{" "}
            </Form.Group>
          </Form>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="row">
                <div className="col-3 p-0">
                  <Form.Label>Date</Form.Label>
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <Form.Control
                    type="datetime-local"
                    className="form-control-date"
                    value={ticketDetail.createdAt}
                    onChange={(e) => handleChange("createdAt", e.target.value)}
                  />
                  <Button className="btn-submit" type="submit">
                    ok
                  </Button>
                  <Button
                    onClick={() => {
                      setEditTicketDetail({ createdAt: false });
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>{" "}
            </Form.Group>
          </Form>
        )}
      </div>
    </div>
  );
};

export default TicketDetailEdit;
