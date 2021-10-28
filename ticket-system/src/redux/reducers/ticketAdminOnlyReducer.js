import { initialState } from "../store/index.js";
import { SET_ONLY_ADMIN_TICKET } from "../actions/types.js";

const ticketAdminOnlyReducer = (
  state = initialState.ticketAdminOnly,
  action
) => {
  switch (action.type) {
    case SET_ONLY_ADMIN_TICKET:
      return {
        ...state,
        tickets: action.payload,
      };

    default:
      return state;
  }
};

export default ticketAdminOnlyReducer;
