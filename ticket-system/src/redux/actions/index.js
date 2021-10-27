import {
  SET_USER,
  SET_TICKET,
  FILL_DATA_ERROR,
  FILL_DATA_LOADING,
  SET_SEARCH_VALUE,
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
