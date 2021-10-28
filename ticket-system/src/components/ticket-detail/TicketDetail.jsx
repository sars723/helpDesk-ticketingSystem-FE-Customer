import React, { useEffect, useState } from "react";
import "./TicketDetail.css";
import { Button, Form } from "react-bootstrap";
import { Next } from "react-bootstrap/esm/PageItem";
import { withRouter } from "react-router-dom";
import TicketDetailEdit from "./ticket-detail-Edit/TicketDetailEdit";
import Moment from "moment";
import FileBase64 from "react-file-base64";

import { connect } from "react-redux";
import { setSelectedTicketAction } from "../../redux/actions/index.js";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.currentUser,
  ticket: state.selectedTicket.selectedTicket,
});

const mapDispatchToProps = (dispatch) => ({
  getSelectedTicket: (ticketId) => {
    dispatch(setSelectedTicketAction(ticketId));
  },
});

const TicketDetail = ({
  match,
  currentUser,
  ticket,
  getSelectedTicket,
  history,
}) => {
  const [msgHistory, setMsgHistory] = useState({
    message: "",
    sender: "",
    attachments: [],
  });

  let sortedMessage =
    ticket &&
    ticket.messageHistory.sort((a, b) => new Date(b.msgAt) - new Date(a.msgAt));
  console.log(sortedMessage);
  const handleChange = (key, value) => {
    setMsgHistory({
      ...msgHistory,
      [key]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let messageHistory = {
      message: msgHistory.message,
      sender: currentUser.email,
      attachments: msgHistory.attachments,
    };
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/reply/" + ticket._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            messageHistory: [messageHistory],
          }),
        }
      );
      if (response.ok) {
        setMsgHistory({ ...msgHistory, message: "" });
      }
    } catch (error) {
      Next(error);
    }
  };
  const handleDelete = async (msgId) => {
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/message/" + msgId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        alert("deleted sucessfully");
        window.location.reload(false);
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const takeOver = async () => {
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/" + ticket._id,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({ assignedTo: currentUser._id }),
        }
      );
      if (response.ok) {
        alert("ticket assigned to you");
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = async (ticketId) => {
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/close-ticket/" + ticketId,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        alert("ticket closed");
        history.push("/");
      } else {
        alert("sth wrong");
      }
    } catch (error) {}
  };
  useEffect(async () => {
    getSelectedTicket(match.params.ticketID);
  }, [msgHistory]);

  return (
    <div className="ticket-detail container-fluid">
      <div className="row  ">
        <div className="col-md-8 pr-5">
          <div className="ticket-detail-content">
            <div className="ticket-detail-content-header">
              <Button className="btn-reply">
                <i className="fa fa-reply"></i>
              </Button>
              <Button className="btn-takeover" onClick={takeOver}>
                Takeover
              </Button>
              <Button
                className="btn-close"
                onClick={() => handleClose(ticket && ticket._id)}
              >
                <i className="fa fa-check"></i>
                Close ticket
              </Button>
            </div>
            {ticket && (
              <div className="ticket-detail-content-text">
                <h6>{ticket.subject}</h6>
                <p>{ticket.detailInfo}</p>
                {ticket.file && (
                  <img
                    className="activator"
                    style={{ height: 300 }}
                    src={ticket.file}
                  />
                )}
                {console.log(ticket.messageHistory.length)}
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="ticket-detail-form-message"
                      placeholder="Reply..."
                      value={msgHistory.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <FileBase64
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setMsgHistory({ ...msgHistory, attachments: base64 })
                      }
                    />
                    {/* <Form.Control
                      type="file"
                      className="ticket-detail-attach-file"
                    /> */}
                  </Form.Group>
                  <Button className="btn-reply" type="submit">
                    Reply
                  </Button>
                </Form>
              </div>
            )}
          </div>{" "}
          <div className="ticket-detail-replay">
            {" "}
            {ticket &&
              ticket.messageHistory.reverse().map((msg, i) => (
                <div className="row conversation" key={i}>
                  <div className="col-1 conversation-avatar">
                    <img
                      src="data:image/png;base64,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"
                      alt=""
                    />
                  </div>
                  <div className="col-11 conversation-msg">
                    <div className="d-flex justify-content-between">
                      {" "}
                      <h6 className="msg-sender">{msg.sender}</h6>
                      <p>
                        <i
                          class="fas fa-trash"
                          onClick={() => handleDelete(msg._id)}
                        ></i>
                      </p>
                    </div>
                    <p>{msg.message}</p>
                    {msg.attachments.length > 0 && (
                      <img
                        className="activator"
                        style={{ width: "100%", height: 300 }}
                        src={msg.attachments}
                      />
                    )}
                  </div>
                  <p className=" msg-at text-muted">
                    {
                      (Moment.locale("GMT+2"),
                      Moment(msg.msgAt).format("DD/MM/YY  hh:mm"))
                    }
                  </p>
                </div>
              ))}
          </div>
        </div>
        {ticket && <TicketDetailEdit ticket={ticket} />}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TicketDetail));
