import { initialState } from "../store/index.js";
import { SET_TICKET } from "../actions/types.js";

const ticketReducer = (state = initialState.ticket, action) => {
  switch (action.type) {
    case SET_TICKET:
      return {
        ...state,
        tickets: action.payload,
      };

    default:
      return state;
  }
};

export default ticketReducer;
