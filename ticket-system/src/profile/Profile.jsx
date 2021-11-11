import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import NavBar from "../components/navbar/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
import { setCurrentUserAction, setUsersAction } from "../redux/actions";
import "./Profile.css";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  users: state.user.users,
});
const mapDispatchToProps = (dispatch) => ({
  /*  getUsers: () => dispatch(setUsersAction()), */
  getCurrentUser: () => dispatch(setCurrentUserAction()),
});
const Profile = ({ currentUser, getCurrentUser /* getUsers */ }) => {
  const [user, setUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/users/me", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("AccessToken")}`,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("updated successfully");
        /* getUsers(); */
        /*  history.push("/manageUsers"); */
      } else {
        alert("sth wrong with updating user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className="container-fluid px-0">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main>
        <div className="main__container">
          <div className="row  ">
            <div className="col-md-6 mt-5 pr-5 mx-auto ">
              <div className="add-user-header">
                {" "}
                <h6 className="text-center">Profile</h6>
              </div>
              <div className="profile-content">
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <div className="profile name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="profile email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  <div className="profile role d-flex ">
                    <p>Role:</p>
                    <p>{currentUser.role}</p>
                  </div>
                  <Button className="btn btn-submit" type="submit">
                    Edit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
