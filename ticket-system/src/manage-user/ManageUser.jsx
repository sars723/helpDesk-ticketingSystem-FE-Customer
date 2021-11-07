import React, { useState, useEffect } from "react";
import "./ManageUser.css";
import { Button, Table, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsersAction } from "../redux/actions";
import { withRouter } from "react-router";
import Moment from "moment";

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
      const response = await fetch("http://localhost:3004/users/" + userId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
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
    <main>
      <div className="main__container">
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
                  <td>{user.name}</td> <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>{Moment(user.createdAt).format("DD/MM/YY")}</td>
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
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageUser));
