import { initialState } from "../store/index.js";
import { SET_CURRENT_USER } from "../actions/types.js";

const setCurrentUserReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_CURRENT_USER":
      return {};
    default:
      return state;
  }
};

export default setCurrentUserReducer;
