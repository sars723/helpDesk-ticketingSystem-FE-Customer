import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./NewTicket.css";
import { withRouter } from "react-router";
import FileBase64 from "react-file-base64";
import { connect } from "react-redux";
import NavBar from "../navbar/NavBar";
import Sidebar from "../sidebar/Sidebar";
import { setCurrentUserAction } from "../../redux/actions";
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});
const intTicket = {
  sender: "",
  category: "",
  priority: "",
  dueDate: "",
  subject: "",
  detailInfo: "",
  file: "",
};

const NewTicket = ({ history, currentUser, getCurrentUser }) => {
  const [ticket, setTicket] = useState(intTicket);
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  const handleChange = (key, value) => {
    setTicket({
      ...ticket,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("AccessToken")}`,
        },
        body: JSON.stringify(ticket),
      });
      if (response.ok) {
        alert("tiket saved");
        const sendedTicket = await response.json();
        /*   console.log(currentUser, "Cu"); */
        currentUser.role === "admin" || currentUser.role === "support-team"
          ? history.push("/ticketDetailAdmin/" + sendedTicket._id)
          : history.push("/ticketDetail/" + sendedTicket._id);
      } else {
        alert("sth wrong with saving ticket, new ticket component");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="container-fluid px-0">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main>
        <div className="main__container  ">
          <div className="row flex-column">
            <div className="col-8 mx-auto mt-3 new-ticket-wrapper">
              <div className="new-ticket-header  ">
                <h6 className="text-center mb-2 p-3">New Ticket</h6>
              </div>
              <Form className=" new-ticket-form p-3" onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Your email address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="email"
                      value={ticket.sender}
                      onChange={(e) => handleChange("sender", e.target.value)}
                    />
                  </Col>
                </Form.Group>
                {/* <div className="new-ticket-form-select row"> */}
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Category
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control
                      as="select"
                      value={ticket.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    >
                      <option>General Issues</option>
                      <option value="General Sales">General Sales</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Software Issue">Software Issue</option>
                      <option value="Hardware Issue">Hardware Issue</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Priority{" "}
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control
                      as="select"
                      vlaue={ticket.priority}
                      onChange={(e) => handleChange("priority", e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Due Date
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control
                      type="date"
                      value={ticket.dueDate}
                      onChange={(e) => handleChange("dueDate", e.target.value)}
                    />
                  </Col>
                </Form.Group>
                {/* </div> */}
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    value={ticket.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Detail</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    vlaue={ticket.detailInfo}
                    onChange={(e) => handleChange("detailInfo", e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setTicket({ ...ticket, file: base64 })
                    }
                  />
                  {/* <Form.Control
                type="file"
                name="attach file"
                onChange={(e) => handleChange("file", e.target.files[0])}
              /> */}
                </Form.Group>
                <Button className="btn-submit " type="submit">
                  submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewTicket));
