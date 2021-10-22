import React, { useEffect } from "react";
import Ticket from "./tickets/Ticket";
import data from "../../../assets/data.json";

const TicketList = ({ searchQuery }) => {
  console.log(searchQuery);

  useEffect(async () => {
    try {
      const response = await fetch(
        "http://localhost:3004/customers/me/tickets",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const tickets = await response.json();
        console.log("tickets =", tickets);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="ticket-list mt-5">
      {searchQuery
        ? data
            .filter((d, i) =>
              d.subject.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((d) => <Ticket data={d} />)
        : data.map((d) => <Ticket data={d} />)}
      {/* <Ticket/> */}
    </div>
  );
};

export default TicketList;
