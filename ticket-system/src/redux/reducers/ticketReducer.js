import { initialState } from "../store/index.js";
import { REMOVE_TICKET, SET_TICKET } from "../actions/types.js";

const ticketReducer = (state = initialState.ticket, action) => {
  switch (action.type) {
    case SET_TICKET:
      return {
        ...state,
        tickets: action.payload,
      };
    case REMOVE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket, i) => i !== action.payload),
      };
    default:
      return state;
  }
};

export default ticketReducer;
