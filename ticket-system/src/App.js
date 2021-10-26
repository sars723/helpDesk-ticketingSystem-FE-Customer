import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/header/Header";
import MainContent from "./components/mainContents/MainContent";
import NewTicket from "./components/new-ticket/NewTicket";
import TicketDetail from "./components/ticket-detail/TicketDetail";
import { useState, useEffect } from "react";
function App() {
  //only until redux
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {}, [searchQuery]);
  console.log(searchQuery);
  return (
    <div className="App">
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* <MainContent /> */}
        <Route
          path="/"
          exact
          /* component={MainContent}  */ render={(routerProps) => (
            <MainContent {...routerProps} searchQuery={searchQuery} />
          )}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/newTicket" exact component={NewTicket} />
        <Route path="/ticketDetail/:ticketID" exact component={TicketDetail} />
        {/* <Login /> */}
      </Router>
    </div>
  );
}

export default App;
