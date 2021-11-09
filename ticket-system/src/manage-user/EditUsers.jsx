import React, { useState, useEffect } from "react";
/* import "./EditUsers.css"; */
import { Button, Table, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsersAction } from "../redux/actions";
import { withRouter } from "react-router";
import Moment from "moment";
import NavBar from "../components/navbar/NavBar";
import Sidebar from "../components/sidebar/Sidebar";

const mapStateToProps = (state) => ({
  users: state.user.users,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(setUsersAction()),
});
const EditUsers = ({ users, getUsers, match, history }) => {
  const userToEdit = users.find((user) => user._id === match.params.userId);
  /* console.log(userToEdit, "user to editttttt"); */
  const [user, setUser] = useState({
    name: userToEdit.name,
    email: userToEdit.email,
    role: userToEdit.role,
    department: userToEdit.department,
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
      const response = await fetch(
        "http://localhost:3004/users/" + match.params.userId,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        alert("updated successfully");
        getUsers();
        history.push("/manageUsers");
      } else {
        alert("sth wrong with updating user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  /* console.log(match.params.userId, "useer to edit"); */
  return (
    <div className="container-fluid px-0">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main>
        <div className="main__container">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Date added</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    {" "}
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Name:{" "}
                      </span>
                      <Form.Control
                        type="text"
                        value={user.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </td>
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Email:{" "}
                      </span>
                      <Form.Control
                        type="email"
                        value={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </td>
                    <td>
                      <span id="hide" className="hide ">
                        Role:{" "}
                      </span>
                      <Form.Control
                        as="select"
                        value={user.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="employee">employee</option>
                        <option value="support-team">support-team</option>
                        <option value="admin">admin</option>
                      </Form.Control>
                    </td>
                    <td>
                      <span id="hide" className="hide ">
                        Department:{" "}
                      </span>
                      <Form.Control
                        as="select"
                        value={user.department}
                        onChange={(e) =>
                          handleChange("department", e.target.value)
                        }
                      >
                        <option value="none">none</option>
                        <option value="IT">IT</option>
                        <option value="support">support</option>
                        <option value="Sales">sales</option>
                        <option value="marketing">marketing</option>
                        <option value="administration">administration</option>
                      </Form.Control>
                    </td>
                    <td>
                      <span id="hide" className="hide ">
                        Created At:{" "}
                      </span>
                      {Moment(user.createdAt).format("DD/MM/YY")}
                    </td>
                    <td className="d-flex justify-content-between">
                      <Button
                        variant="secondary"
                        className="btn-submit mr-2"
                        type="submit"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          history.push("/manageUsers");
                        }}
                      >
                        cancel
                      </Button>{" "}
                    </td>
                  </tr>{" "}
                </tbody>
              </Table>
            </Form.Group>{" "}
          </Form>
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditUsers));
