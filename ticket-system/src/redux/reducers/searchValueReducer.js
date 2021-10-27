import { initialState } from "../store/index.js";
import { SET_SEARCH_VALUE } from "../actions/types.js";

const searchValueReducer = (state = initialState.searchValue, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

export default searchValueReducer;
