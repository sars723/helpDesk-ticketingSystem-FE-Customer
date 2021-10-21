import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./NewTicket.css";
const intTicket = {
  email: "",
  category: "",
  priority: "",
  dueDate: "",
  subject: "",
  detail: "",
  file: "",
};
const NewTicket = () => {
  const [ticket, setTicket] = useState(intTicket);

  const handleChange = (key, value) => {
    setTicket({
      ...ticket,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ticket);
  };
  return (
    <div className="new-ticket container-fluid  ">
      <div className="row flex-column">
        <div className="col-8 mx-auto mt-5 new-ticket-wrapper">
          <div className="new-ticket-header  ">
            <p className="mb-0 p-3">New Ticket</p>
          </div>
          <Form className=" new-ticket-form p-3" onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Your email address
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  value={ticket.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  <option value="Payment Issues">Payment Issues</option>
                  <option value="Software Issues">Software Issues</option>
                  <option value="Hardware Issues">Hardware Issues</option>
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
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
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
                vlaue={ticket.detail}
                onChange={(e) => handleChange("detail", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="file"
                name="attach file"
                onChange={(e) => handleChange("file", e.target.files[0])}
              />
            </Form.Group>
            <Button className="btn-submit" type="submit">
              submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
