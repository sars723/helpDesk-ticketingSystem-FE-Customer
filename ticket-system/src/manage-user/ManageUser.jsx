import React, { useState, useEffect } from "react";
import "./ManageUser.css";
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
const ManageUser = ({ users, getUsers, history }) => {
  /* const [users, setUsers] = useState([]); */

  const [editUser, setEditUser] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        "process.env.REACT_APP_BE_URL/users/" + userId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        alert("user deleted successfully");
        getUsers();
      } else {
        alert("sth wrong with deleting user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container-fluid px-0">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main>
        <div className="main__container mt-5">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Date added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Name:{" "}
                      </span>
                      {user.name}
                    </td>{" "}
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Email:{" "}
                      </span>
                      {user.email}
                    </td>
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Role:{" "}
                      </span>
                      {user.role}
                    </td>
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Department:{" "}
                      </span>
                      {user.department}
                    </td>
                    <td>
                      {" "}
                      <span id="hide" className="hide ">
                        Created At:{" "}
                      </span>
                      {Moment(user.createdAt).format("DD/MM/YY")}
                    </td>
                    <td className="d-flex justify-content-between">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => history.push("/editUsers/" + user._id)}
                      >
                        <i class="fas fa-pencil-alt"></i> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUser(user._id)}
                      >
                        <i class="fas fa-trash"></i> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageUser));
