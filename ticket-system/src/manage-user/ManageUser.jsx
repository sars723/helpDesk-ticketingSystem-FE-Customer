import React, { useState, useEffect } from "react";
import "./ManageUser.css";
import { Button, Table, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsersAction } from "../redux/actions";

const mapStateToProps = (state) => ({
  users: state.user.users,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(setUsersAction()),
});
const ManageUser = ({ users, getUsers }) => {
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
  /* const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3004/users", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const fetchedUsers = await response.json();
        console.log("fetched users in manage user component", fetchedUsers);
        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }; */
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container mt-5">
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Date added</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{user.name}</td> <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>{user.createdAt}</td>
                <td>
                  <Button variant="secondary" onClick={() => setEditUser(true)}>
                    <i class="fas fa-pencil-alt"></i> Edit
                  </Button>
                </td>
              </tr>
            ))}
          {/* {!editUser
            ? users.length > 0 &&
              users.map((user, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{user.name}</td> <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => setEditUser(true)}
                    >
                      <i class="fas fa-pencil-alt"></i> Edit
                    </Button>
                  </td>
                </tr>
              ))
            : users.length > 0 &&
              users.map((user, i) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <tr>
                      {" "}
                      <td>
                        {" "}
                        <Form.Control
                          type="text"
                          value={user.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                      </td>
                      <td>
                        {" "}
                        <Form.Control
                          type="email"
                          value={user.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                        />
                      </td>
                      <td>
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
                          <option value="sales">sales</option>
                          <option value="marketing">marketing</option>
                          <option value="administration">administration</option>
                        </Form.Control>
                      </td>
                      <td>{user.createdAt}</td>
                      <Button className="btn-submit" type="submit">
                        ok
                      </Button>
                      <Button
                        onClick={() => {
                          setEditUser(false);
                        }}
                      >
                        cancel
                      </Button>{" "}
                    </tr>{" "}
                  </Form.Group>
                </Form>
              ))} */}
        </tbody>
      </Table>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
