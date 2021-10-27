import { initialState } from "../store";
import { SET_USER } from "../actions/types";

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};

export default userReducer;
