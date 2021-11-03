import {
  SET_USER,
  SET_TICKET,
  FILL_DATA_ERROR,
  FILL_DATA_LOADING,
  SET_SEARCH_VALUE,
  SET_CURRENT_USER,
  SET_SELECTED_TICKET,
  REMOVE_TICKET,
  SET_ONLY_ADMIN_TICKET,
  SET_SELECTED_MY_TICKET,
  SET_SORTING_KEY,
} from "./types.js";

export const setUsersAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3004/users", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const fetchedUsers = await response.json();
        /*    console.log("fetched users in manage user component", fetchedUsers); */
        dispatch({
          type: SET_USER,
          payload: fetchedUsers,
        });
      } else {
        alert("sth wrong with setUsersAction");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
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
        /*  console.log(fetchedTickets, "user ticket"); */
        dispatch({
          type: SET_TICKET,
          payload: fetchedTickets,
        });
      } else {
        alert("sth wrong with setTicketsAction");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setTicketsOnlyAdminAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3004/tickets", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const fetchedTickets = await response.json();
        /* console.log("allticketsadmin", fetchedTickets); */
        dispatch({
          type: SET_ONLY_ADMIN_TICKET,
          payload: fetchedTickets,
        });
      } else {
        alert("sth wrong with setTicketsOnlyAdminAction ");
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
        /*  console.log("fetchedsender or current user", fetchedSender); */
        dispatch({
          type: SET_CURRENT_USER,
          payload: fetchedSender,
        });
      } else {
        alert("sth wrong with setCurrentUserAction");
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
        console.log(fetchedTicket, "fetched ticket set selected action ");
        dispatch({
          type: SET_SELECTED_TICKET,
          payload: fetchedTicket,
        });
      } else {
        alert("sth wrong with setSelectedTicketAction");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSelectedMyTicketAction = (ticketID) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:3004/users/me/tickets/" + ticketID,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const fetchedTicket = await response.json();
        /*  console.log("my ticket redux action", fetchedTicket); */
        dispatch({
          type: SET_SELECTED_MY_TICKET,
          payload: fetchedTicket,
        });
      } else {
        alert("sth wrong with setSelectedMyTicketAction  ");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeTicketAction = (index) => {
  return {
    type: REMOVE_TICKET,
    payload: index,
  };

  /*   return async(dispatch)=>{
    try {
      const response=await fetch("http://localhost:3004/tickets/"+ticketID,{
        method:"PUT",
        headers:{
          Authorization:`Bearer ${window.localStorage.getItem("Token")}`
        }
      })
      if(response.ok)
      
    } catch (error) {
      
    }
  } */
};
export const setSortingKeyAction = (sortKey) => {
  return {
    type: SET_SORTING_KEY,
    payload: sortKey,
  };
};
