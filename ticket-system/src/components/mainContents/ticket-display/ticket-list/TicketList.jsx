import React, { useEffect, useState } from "react";
import Ticket from "./tickets/Ticket";
import data from "../../../assets/data.json";

const TicketList = ({ searchQuery }) => {
  console.log(searchQuery);
  const [tickets, setTickets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch("http://localhost:3004/users/me/tickets", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const fetchedTickets = await response.json();
        console.log("tickets =");
        setTickets(fetchedTickets);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="ticket-list mt-5">
      {tickets.length > 0 && console.log("tick=", tickets[0].subject)}
      {
        tickets.length > 0 &&
          tickets
            .filter((ticket, i) =>
              ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((ticket, i) => <Ticket key={i} ticket={ticket} />)
        /* : tickets.length > 0 &&
          tickets.map((ticket, i) => <Ticket key={i} tickets={ticket} />) */
      }
    </div>
  );
};

export default TicketList;
