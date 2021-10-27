import {
  SET_USER,
  SET_TICKET,
  FILL_DATA_ERROR,
  FILL_DATA_LOADING,
  SET_SEARCH_VALUE,
  SET_CURRENT_USER,
  SET_SELECTED_TICKET,
} from "./types.js";
export const setTicketsAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3004/users/me/tickets", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const fetchedTickets = await response.json();
        console.log(fetchedTickets);
        dispatch({
          type: SET_TICKET,
          payload: fetchedTickets,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSearchValueAction = (searchQuery) => {
  return {
    type: SET_SEARCH_VALUE,
    payload: searchQuery,
  };
};

export const setCurrentUserAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:3004/users/me" /* + ticket.sender._id */,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const fetchedSender = await response.json();
        console.log("fetchedsender or current user", fetchedSender);
        dispatch({
          type: SET_CURRENT_USER,
          payload: fetchedSender,
        });
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSelectedTicketAction = (ticketID) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:3004/tickets/" + ticketID,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const fetchedTicket = await response.json();
        console.log(fetchedTicket);
        dispatch({
          type: SET_SELECTED_TICKET,
          payload: fetchedTicket,
        });
      } else {
        alert("sth wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
