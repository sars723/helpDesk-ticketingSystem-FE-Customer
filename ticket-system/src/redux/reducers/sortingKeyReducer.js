import { SET_SORTING_KEY } from "../actions/types";
import { initialState } from "../store";

const sortingKeyReducer = (state = initialState.sortingKey, action) => {
  switch (action.type) {
    case SET_SORTING_KEY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default sortingKeyReducer;
