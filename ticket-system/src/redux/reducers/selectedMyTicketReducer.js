import { initialState } from "../store/index.js";
import { SET_SELECTED_MY_TICKET } from "../actions/types.js";

const selectedMyTicketReducer = (
  state = initialState.selectedMyTicket,
  action
) => {
  switch (action.type) {
    case SET_SELECTED_MY_TICKET:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default selectedMyTicketReducer;
