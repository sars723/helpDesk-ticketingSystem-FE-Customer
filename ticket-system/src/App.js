import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/header/Header";
import MainContent from "./components/mainContents/MainContent";
import NewTicket from "./components/new-ticket/NewTicket";
import TicketDetail from "./components/ticket-detail/TicketDetail";
import TicketDetailAdminOnly from "./components/ticket-detail/TicketDetailAdminOnly";
import Profile from "./profile/Profile";
import AddUser from "./add-user/AddUser";
import ManageUser from "./manage-user/ManageUser";
import Reports from "./reports/Reports";
import UnassignedTicketPage from "./filtered-pages/UnassignedTicketPage";
import UnclosedTicketPage from "./filtered-pages/UnclosedTicketPage";
import AssignedToCurrentAgentTicketPage from "./filtered-pages/AssignedToCurrentAgentTicketPage";
import HardwareIssueCategoryTicket from "./filtered-pages/HardwareIssueCategoryTicket";
import SoftwareIssueCategoryTicket from "./filtered-pages/SoftwareIssueCategoryTicket";
import PaymentIssueCategoryTicketPage from "./filtered-pages/PaymentIssueCategoryTicketPage";
import GeneralSalesCategoryTicket from "./filtered-pages/GeneralSalesCategoryTicket";

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
        <Route path="/profile" exact component={Profile} />
        <Route path="/manageUsers" exact component={ManageUser} />
        <Route path="/addUsers" exact component={AddUser} />
        <Route path="/reports" exact component={Reports} />
        <Route
          path="/unassignedTickets"
          exact
          component={UnassignedTicketPage}
        />
        <Route path="/unclosedTickets" exact component={UnclosedTicketPage} />
        <Route
          path="/assignedToCurrentAgentTickets"
          exact
          component={AssignedToCurrentAgentTicketPage}
        />
        <Route
          path="/generalSalesCategoryTickets"
          exact
          component={GeneralSalesCategoryTicket}
        />
        <Route
          path="/paymentIssueCategoryTickets"
          exact
          component={PaymentIssueCategoryTicketPage}
        />
        <Route
          path="/softwareIssueCategoryTickets"
          exact
          component={SoftwareIssueCategoryTicket}
        />
        <Route
          path="/hardwareIssueCategoryTickets"
          exact
          component={HardwareIssueCategoryTicket}
        />
      </Router>
    </div>
  );
}

export default App;
