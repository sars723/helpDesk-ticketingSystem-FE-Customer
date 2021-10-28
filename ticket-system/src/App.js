import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/header/Header";
import MainContent from "./components/mainContents/MainContent";
import NewTicket from "./components/new-ticket/NewTicket";
import TicketDetail from "./components/ticket-detail/TicketDetail";
import TicketDetailAdminOnly from "./components/ticket-detail/TicketDetailAdminOnly";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route
          path="/"
          exact
          render={(routerProps) => <MainContent {...routerProps} />}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/newTicket" exact component={NewTicket} />
        <Route path="/ticketDetail/:ticketID" exact component={TicketDetail} />
        <Route
          path="/ticketDetailAdmin/:ticketID"
          exact
          component={TicketDetailAdminOnly}
        />
      </Router>
    </div>
  );
}

export default App;
