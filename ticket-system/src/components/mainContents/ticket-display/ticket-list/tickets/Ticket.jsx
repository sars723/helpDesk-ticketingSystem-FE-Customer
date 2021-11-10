import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import "./Ticket.css";
import { connect } from "react-redux";
import moment from "moment";
import { setCurrentUserAction } from "../../../../../redux/actions";
import axios from "axios";
import { saveAs } from "file-saver";
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});

const Ticket = ({ ticket, history, currentUser, getCurrentUser }) => {
  const createAndDownloadpdf = async () => {
    axios
      .post(process.env.REACT_APP_BE_URL + "/tickets/create-pdf", ticket, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      })
      .then(() =>
        axios.get(
          process.env.REACT_APP_BE_URL + "/tickets/get-pdf",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          },
          {
            responseType: "blob",
          }
        )
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  useEffect(() => {
    console.log("ticket unanswered", ticket);
    getCurrentUser();
  }, [ticket]);
  useEffect(() => {
    getCurrentUser();
  }, []);
  console.log("hello");
  return (
    <>
      {ticket !== "undefined" ? (
        <tr>
          <td>
            <h5
              onClick={() => {
                history.push("/ticketDetail/" + ticket._id);
              }}
            >
              <span id="hide" className="hide ">
                Subject:{" "}
              </span>
              {ticket.subject}
            </h5>
            <div className="user-category">
              <p>
                <i className="fa fa-user"></i>

                {currentUser.name}
              </p>

              <p>
                <i className="fa fa-folder-open"></i>
                <span id="hide" className="hide ml-2 ">
                  Category:{" "}
                </span>{" "}
                {ticket.category}
              </p>
            </div>
          </td>
          <td>
            {ticket.priority === "Critical" ? (
              <Badge variant="danger">{ticket.priority}</Badge>
            ) : (
              <p>
                {" "}
                <span id="hide" className="hide ">
                  Priority:{" "}
                </span>
                {ticket.priority}
              </p>
            )}
          </td>
          <td>
            <p>
              {" "}
              <span id="hide" className="hide ">
                Status:{" "}
              </span>
              <Badge
                variant={ticket.status === "closed" ? "secondary" : "success"}
              >
                {ticket.status}
              </Badge>
            </p>
          </td>
          <td>
            {" "}
            <p>
              {" "}
              <span id="hide" className="hide ">
                Created At:{" "}
              </span>
              {moment(ticket.createdAt).fromNow()}
            </p>
          </td>
          <td>
            <p>
              <span id="hide" className="hide ">
                Due date:{" "}
              </span>
              {ticket.dueDate && moment(ticket.dueDate).fromNow()}
            </p>
          </td>
          <td>
            {" "}
            {/* <p> {ticket.assignedTo !== "" && user && user.name}</p> */}
            <p>
              {" "}
              {ticket.sender === "" ? (
                <span style={{ color: "lightgrey" }}>not assigned</span>
              ) : (
                ticket.assignedTo.email
              )}
            </p>
          </td>
          <td>
            {" "}
            <p>{moment(ticket.updatedAt).fromNow()}</p>
          </td>
          <td>
            {" "}
            <OverlayTrigger
              trigger="click"
              key="left"
              placement="left"
              overlay={
                <Popover id="popover-positioned-left">
                  <Popover.Content>
                    <ul className="d-flex justify-content-between align-items-center mb-1 mt-1">
                      {/* <li onClick={() => deleteTicket()}>Delete</li> */}
                      <li /* onClick={createAndPrintpdf} */>Print</li>
                      <li onClick={createAndDownloadpdf}>Download</li>
                    </ul>
                  </Popover.Content>
                </Popover>
              }
            >
              <input type="checkbox" />
            </OverlayTrigger>
          </td>
        </tr>
      ) : (
        <tr>
          <td>
            <p>No Ticket to show</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ticket));
