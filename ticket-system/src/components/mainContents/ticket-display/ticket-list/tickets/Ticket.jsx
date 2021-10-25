import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Ticket.css";
/* import { useHistory } from "react-router"; */
const Ticket = ({ ticket, history }) => {
  const [user, setUser] = useState(null);
  /* let history = useHistory(); */
  useEffect(async () => {
    try {
      const response = await fetch(
        "http://localhost:3004/users/" + ticket.sender,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const fetchedUser = await response.json();
        console.log(fetchedUser);
        setUser(fetchedUser);
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="ticket row mb-5">
      {console.log("newTicket", ticket)}
      <div className="col-md-4">
        <h5
          onClick={() =>
            history.push({
              pathname: "/ticketDetail",
              state: { ticketD: ticket },
            })
          }
        >
          {ticket.subject}
        </h5>
        <div className="user-category">
          <p>{user && user.name}</p>
          <p>{ticket.category}</p>
        </div>
      </div>
      <div className="col-md-8 d-flex justify-content-between align-items-center ">
        <p>{ticket.priority}</p>
        <p>New</p>
        <p>11 hours ago</p>
        <p>{user && user.name}</p>
        <p>2 hours ago</p>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default withRouter(Ticket) /* Ticket */;
