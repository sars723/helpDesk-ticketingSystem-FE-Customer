import "./NavBar.css";
import { useEffect } from "react";
import { Form, FormControl, Button, Dropdown, Nav } from "react-bootstrap";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  setSearchValueAction /* setUserCurrentUser */,
} from "../../redux/actions";
const mapStateToProps = (state) => ({
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchQuery: (searchQuery) => {
    dispatch(setSearchValueAction(searchQuery));
  },
});

const NavBar = ({
  sidebarOpen,
  openSidebar,
  searchQuery,
  setSearchQuery,
  currentUser,
  getCurrentUser,
  location,
}) => {
  const allClass =
    location.pathname === "/home" ? "nav-link active" : "nav-link ";
  const manageUserClass = location.pathname.match(/^\/manageUsers/)
    ? "nav-link active"
    : "nav-link ";
  const addUserClass = location.pathname.match(/^\/addUsers/)
    ? "nav-link active"
    : "nav-link";
  const newTicketClass = location.pathname.match(/^\/newTicket/)
    ? "nav-link active"
    : "nav-link ";

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const logout = () => {
    /*  dispatch(setUserCurrentUser({})); */
    window.localStorage.clear();
    history.push("/login");
  };
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left ">
        <Link to="/home" className={allClass}>
          <i className="fa fa-inbox mr-2"></i>Tickets
        </Link>
        <Link to="/newTicket" className={newTicketClass}>
          <i className="fa fa-plus-square mr-2"></i>New ticket
        </Link>
        {currentUser.role === "admin" ? (
          <>
            <Link to="/manageUsers" className={manageUserClass}>
              <i className="fa fa-fw fa-users mr-2"></i>ManageUsers
            </Link>
            <Link to="/addUsers" className={addUserClass}>
              <i className="fa fa-fw fa-plus mr-2"></i>Add Users
            </Link>
          </>
        ) : currentUser.role === "support-team" ? (
          <Link to="/addUsers" className={addUserClass}>
            <i className="fa fa-fw fa-plus mr-2"></i>Add Users
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="navbar__right">
        <Form inline className="search">
          <Button variant="outline-success">
            <i className="fa fa-search"></i>
          </Button>
          <FormControl
            type="text"
            placeholder="Search"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>

        <Dropdown className="loged-user-info ml-3" autoClose={true}>
          <Dropdown.Toggle>
            <i className="fas fa-user mr-2"></i>

            <span className="user-email-address">
              {location.pathname === "/login" ||
              location.pathname === "/register"
                ? "user@xxxx.xxx"
                : currentUser && currentUser.email}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu autoBlur={true}>
            <Dropdown.Item href="#">
              <Link to="/profile" className="dropdown-item nav-link">
                <img
                  src={currentUser.avatar}
                  style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                  alt=""
                  /* onClick={uploadAvatar} */
                />

                <span className="ml-1">Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#">
              {" "}
              {location.pathname === "/register" ? (
                <Link to="/login" className="dropdown-item nav-link">
                  <span className="ml-2 ">Sign Up</span>
                </Link>
              ) : location.pathname === "/login" ? (
                <Link to="/home" className="dropdown-item nav-link">
                  <span className="ml-2 ">Log In</span>
                </Link>
              ) : (
                <a onClick={logout} className="dropdown-item nav-link">
                  <span className="ml-2 "> Log Out</span>
                </a>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
