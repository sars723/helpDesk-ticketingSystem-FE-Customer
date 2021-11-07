/* import Login from "./components/Login";
import "./App.css";
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
import UnassignedTicketPageAdmin from "./filtered-pages-admin/UnassignedTicketPageAdmin";
import UnclosedTicketPageAdmin from "./filtered-pages-admin/UnclosedTicketPageAdmin";
import AssignedToCurrentAgentTicketPageAdmin from "./filtered-pages-admin/AssignedToCurrentAgentTicketPageAdmin";
import HardwareIssueCategoryTicketPageAdmin from "./filtered-pages-admin/HardwareIssueCategoryTicketPageAdmin";
import SoftwareIssueCategoryTicketPageAdmin from "./filtered-pages-admin/SoftwareIssueCategoryTicketPageAdmin";
import PaymentIssueCategoryTicketPageAdmin from "./filtered-pages-admin/PaymentIssueCategoryTicketPageAdmin";
import GeneralSalesCategoryTicketPageAdmin from "./filtered-pages-admin/GeneralSalesCategoryTicketPageAdmin";
import EditUsers from "./manage-user/EditUsers";
import UnansweredTicketPageAdmin from "./filtered-pages-admin/UnansweredTicketPageAdmin";
import UnclosedTicketPageUser from "./filtered-pages-user/UnclosedTicketPageUser";
import UnansweredTicketPageUser from "./filtered-pages-user/UnansweredTicketPageUser";
import UnassignedTicketPageUser from "./filtered-pages-user/UnassignedTicketPageUser";
import GeneralSalesCategoryTicketPageUser from "./filtered-pages-user/GeneralSalesCategoryTicketPageUser";
import HardwareIssueCategoryTicketPageUser from "./filtered-pages-user/HardwareIssueCategoryTicketPageUser";
import PaymentIssueCategoryTicketPageUser from "./filtered-pages-user/PaymentIssueCategoryTicketPageUser";
import SoftwareIssueCategoryTicketPageUser from "./filtered-pages-user/SoftwareIssueCategoryTicketPageUser";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/"
          exact
          render={(routerProps) => <MainContent {...routerProps} />}
        />

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
          path="/unansweredTicketsAdmin"
          exact
          component={UnansweredTicketPageAdmin}
        />
        <Route
          path="/unassignedTicketsAdmin"
          exact
          component={UnassignedTicketPageAdmin}
        />
        <Route
          path="/unclosedTicketsAdmin"
          exact
          component={UnclosedTicketPageAdmin}
        />
        <Route
          path="/assignedToCurrentAgentTicketsAdmin"
          exact
          component={AssignedToCurrentAgentTicketPageAdmin}
        />
        <Route
          path="/generalSalesCategoryTicketsAdmin"
          exact
          component={GeneralSalesCategoryTicketPageAdmin}
        />
        <Route
          path="/paymentIssueCategoryTicketsAdmin"
          exact
          component={PaymentIssueCategoryTicketPageAdmin}
        />
        <Route
          path="/softwareIssueCategoryTicketsAdmin"
          exact
          component={SoftwareIssueCategoryTicketPageAdmin}
        />
        <Route
          path="/hardwareIssueCategoryTicketsAdmin"
          exact
          component={HardwareIssueCategoryTicketPageAdmin}
        />

     
        <Route
          path="/generalSalesCategoryTicketsUser"
          exact
          component={GeneralSalesCategoryTicketPageUser}
        />
        <Route
          path="/hardwareIssueCategoryTicketsUser"
          exact
          component={HardwareIssueCategoryTicketPageUser}
        />
        <Route
          path="/paymentIssueCategoryTicketsUser"
          exact
          component={PaymentIssueCategoryTicketPageUser}
        />
        <Route
          path="/softwareIssueCategoryTicketsUser"
          exact
          component={SoftwareIssueCategoryTicketPageUser}
        />
        <Route
          path="/unansweredTicketsUser"
          exact
          component={UnansweredTicketPageUser}
        />
        <Route
          path="/unassignedTicketsUser"
          exact
          component={UnassignedTicketPageUser}
        />
        <Route
          path="/unclosedTicketsUser"
          exact
          component={UnclosedTicketPageUser}
        />
        <Route path="/editUsers/:userId" exact component={EditUsers} />
      </Router>
    </div>
  );
}

export default App;
 */
import { useState } from "react";
import Login from "./components/Login";
import "./App.css";
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
import UnassignedTicketPageAdmin from "./filtered-pages-admin/UnassignedTicketPageAdmin";
import UnclosedTicketPageAdmin from "./filtered-pages-admin/UnclosedTicketPageAdmin";
import AssignedToCurrentAgentTicketPageAdmin from "./filtered-pages-admin/AssignedToCurrentAgentTicketPageAdmin";
import HardwareIssueCategoryTicketPageAdmin from "./filtered-pages-admin/HardwareIssueCategoryTicketPageAdmin";
import SoftwareIssueCategoryTicketPageAdmin from "./filtered-pages-admin/SoftwareIssueCategoryTicketPageAdmin";
import PaymentIssueCategoryTicketPageAdmin from "./filtered-pages-admin/PaymentIssueCategoryTicketPageAdmin";
import GeneralSalesCategoryTicketPageAdmin from "./filtered-pages-admin/GeneralSalesCategoryTicketPageAdmin";
import EditUsers from "./manage-user/EditUsers";
import UnansweredTicketPageAdmin from "./filtered-pages-admin/UnansweredTicketPageAdmin";
import UnclosedTicketPageUser from "./filtered-pages-user/UnclosedTicketPageUser";
import UnansweredTicketPageUser from "./filtered-pages-user/UnansweredTicketPageUser";
import UnassignedTicketPageUser from "./filtered-pages-user/UnassignedTicketPageUser";
import GeneralSalesCategoryTicketPageUser from "./filtered-pages-user/GeneralSalesCategoryTicketPageUser";
import HardwareIssueCategoryTicketPageUser from "./filtered-pages-user/HardwareIssueCategoryTicketPageUser";
import PaymentIssueCategoryTicketPageUser from "./filtered-pages-user/PaymentIssueCategoryTicketPageUser";
import SoftwareIssueCategoryTicketPageUser from "./filtered-pages-user/SoftwareIssueCategoryTicketPageUser";
import NavBar from "./components/navbar/NavBar";
import Sidebar from "./components/sidebar/Sidebar";
function App() {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container-fluid px-0">
      <Router>
        {/* <Header /> */}
        {/*  {console.log(window.location.pathname)}
        {window.location.pathname !== "/register" &&
        window.location.pathname !== "/login" ? (
          <>
            <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </>
        ) : (
          ""
        )} */}
        <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/"
          exact
          render={(routerProps) => <MainContent {...routerProps} />}
        />
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
          path="/unansweredTicketsAdmin"
          exact
          component={UnansweredTicketPageAdmin}
        />
        <Route
          path="/unassignedTicketsAdmin"
          exact
          component={UnassignedTicketPageAdmin}
        />
        <Route
          path="/unclosedTicketsAdmin"
          exact
          component={UnclosedTicketPageAdmin}
        />
        <Route
          path="/assignedToCurrentAgentTicketsAdmin"
          exact
          component={AssignedToCurrentAgentTicketPageAdmin}
        />
        <Route
          path="/generalSalesCategoryTicketsAdmin"
          exact
          component={GeneralSalesCategoryTicketPageAdmin}
        />
        <Route
          path="/paymentIssueCategoryTicketsAdmin"
          exact
          component={PaymentIssueCategoryTicketPageAdmin}
        />
        <Route
          path="/softwareIssueCategoryTicketsAdmin"
          exact
          component={SoftwareIssueCategoryTicketPageAdmin}
        />
        <Route
          path="/hardwareIssueCategoryTicketsAdmin"
          exact
          component={HardwareIssueCategoryTicketPageAdmin}
        />
        <Route
          path="/generalSalesCategoryTicketsUser"
          exact
          component={GeneralSalesCategoryTicketPageUser}
        />
        <Route
          path="/hardwareIssueCategoryTicketsUser"
          exact
          component={HardwareIssueCategoryTicketPageUser}
        />
        <Route
          path="/paymentIssueCategoryTicketsUser"
          exact
          component={PaymentIssueCategoryTicketPageUser}
        />
        <Route
          path="/softwareIssueCategoryTicketsUser"
          exact
          component={SoftwareIssueCategoryTicketPageUser}
        />
        <Route
          path="/unansweredTicketsUser"
          exact
          component={UnansweredTicketPageUser}
        />
        <Route
          path="/unassignedTicketsUser"
          exact
          component={UnassignedTicketPageUser}
        />
        <Route
          path="/unclosedTicketsUser"
          exact
          component={UnclosedTicketPageUser}
        />
        <Route path="/editUsers/:userId" exact component={EditUsers} />
      </Router>
    </div>
  );
}

export default App;
