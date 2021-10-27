import { initialState } from "../store/index.js";
import { SET_SELECTED_TICKET } from "../actions/types.js";

const selectedTicketReducer = (state = initialState.selectedTicket, action) => {
  switch (action.type) {
    case SET_SELECTED_TICKET:
      return {
        ...state,
        selectedTicket: action.payload,
      };

    default:
      return state;
  }
};

export default selectedTicketReducer;
