import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer.js";
import ticketReducer from "../reducers/ticketReducer.js";
import searchValueReducer from "../reducers/searchValueReducer.js";
import currentUserReducer from "../reducers/currentUserReducer.js";
import selectedTicketReducer from "../reducers/selectedTicketReducer.js";
import ticketAdminOnlyReducer from "../reducers/ticketAdminOnlyReducer.js";
import selectedMyTicketReducer from "../reducers/selectedMyTicketReducer.js";
import sortingKeyReducer from "../reducers/sortingKeyReducer.js";

export const initialState = {
  ticket: {
    tickets: [],
    loading: false,
    error: false,
  },
  user: {
    users: [],
    loading: false,
    error: false,
  },
  searchValue: {
    searchQuery: "",
  },
  currentUser: {},
  selectedTicket: {},
  selectedMyTicket: {},
  ticketAdminOnly: {
    tickets: [],
    loading: false,
    error: false,
  },
  sortingKey: "",
};

const combinedReducers = combineReducers({
  ticket: ticketReducer,
  user: userReducer,
  searchValue: searchValueReducer,
  currentUser: currentUserReducer,
  selectedTicket: selectedTicketReducer,
  selectedMyTicket: selectedMyTicketReducer,
  ticketAdminOnly: ticketAdminOnlyReducer,
  sortingKey: sortingKeyReducer,
});

const configureStore = createStore(
  combinedReducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);

export default configureStore;
