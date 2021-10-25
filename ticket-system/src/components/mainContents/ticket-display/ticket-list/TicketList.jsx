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
        console.log("tickets =", fetchedTickets);
        setTickets(fetchedTickets);
        console.log("ticket", tickets);
      }
    } catch (error) {
      console.log(error);
    }
  }, [tickets]);
  return (
    <div className="ticket-list mt-5">
      {tickets && console.log("tick", tickets[0])}
      {searchQuery
        ? tickets &&
          tickets
            .filter((ticket, i) =>
              ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((ticket, i) => <Ticket key={i} ticket={ticket} />)
        : tickets &&
          tickets.map((ticket, i) => <Ticket key={i} tickets={ticket} />)}
      {/* <Ticket/> */}
    </div>
  );
};

export default TicketList;
