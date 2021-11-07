import React, { useEffect, useState } from "react";
import "./TicketDetailEdit.css";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsersAction } from "../../../redux/actions";
import { withRouter } from "react-router";

const mapStateToProps = (state) => ({
  users: state.user.users,
  tickets: state.ticket.tickets,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(setUsersAction()),
});
const TicketDetailEdit = ({ ticket, users, getUsers, tickets, history }) => {
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
        }
      );
      if (response.ok) {
        alert("ticket updated");
        getUsers();
        history.push("/");
      } else {
        alert("sth wrong with updating a ticket, ticket detail edit component");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users, "usrs dropdown", ticket, "ticket");
  return (
    <div className="ticket-detail-edit col-md-5 pl-4 ticket-detail-status">
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
              <p>{ticket.priority}</p>{" "}
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
                    <option value="Critical">Critical</option>
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
              <p>{ticket.category}</p>{" "}
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
                    {/*      {tickets &&
                      tickets.map((ticket) => (
                        <option value={ticket.category}>
                          {ticket.category}
                        </option>
                      ))} */}
                    <option value="General Issue">General Issue</option>
                    <option value="General Sales">General Sales</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Hardware Issue">Hardware Issue</option>
                    <option value="Software Issue">Software Issue</option>
                  </Form.Control>
                  <Button className="btn-submit mr-2" type="submit">
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
              {/*   {console.log("is user exist", users)} */}
              {users &&
                users
                  .filter((user) => user._id === ticket.sender._id)
                  .map((user) => <p>{user.name}</p>)}{" "}
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
                  {/* {console.log(users, "users dropdown")} */}
                  <Form.Control
                    as="select"
                    name="assignTo"
                    value={ticketDetail.sender}
                    onChange={(e) => handleChange("sender", e.target.value)}
                  >
                    {users &&
                      users
                        .filter((user) => user.role === "user")
                        .map((team) => (
                          <option value={team._id}>{team.name}</option>
                        ))}
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
              {users &&
                users
                  .filter((user) => user._id === ticket.assignedTo)
                  .map((user) => <p>{user.name ? user.name : "none"}</p>)}
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
                    {users &&
                      users
                        .filter(
                          (user) =>
                            user.role === "support-team" ||
                            user.role === "admin"
                        )
                        .map((team) => (
                          <option value={team._id}>{team.name}</option>
                        ))}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TicketDetailEdit));
