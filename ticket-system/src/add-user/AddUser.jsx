import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./AddUser.css";
const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setPasswordError("password dont match");
      return false;
    } else {
      const response = await fetch("http://localhost:3004/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("registered", data);
        alert("sucessfully registered ");
      } else {
        alert("sth wrong with the registration");
      }
    }
    try {
    } catch (error) {}
  };
  return (
    <div className="add-user container-fluid">
      <div className="row  mt-3">
        <div className="col-md-4 pr-5 mx-auto ">
          <div className="add-user-content">
            <h2 className="text-center">Add User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <div className=" user-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <div className="profile email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <div className="user-role">
                  <Form.Label>role</Form.Label>
                  <Form.Control
                    as="select"
                    value={user.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    required
                  >
                    <option value="user" selected>
                      user
                    </option>
                    <option value="employee">employee</option>
                    <option value="support-team">support-team</option>
                    <option value="admin">admin</option>
                  </Form.Control>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="user-department">
                  <Form.Label>department</Form.Label>
                  <Form.Control
                    as="select"
                    value={user.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    required
                  >
                    <option value="none" selected>
                      none
                    </option>
                    <option value="IT">IT</option>
                    <option value="support">support</option>
                    <option value="sales">sales</option>
                    <option value="marketing">marketing</option>
                    <option value="administration">administration</option>
                  </Form.Control>
                </div>
              </Form.Group>
              <Form.Group>
                <div className=" user-password">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    value={user.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                </div>
                <div>{passwordError}</div>
              </Form.Group>
              <Form.Group>
                <div className=" user-confirmpassword ">
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div>{passwordError}</div>
              </Form.Group>
              <Button className="btn btn-submit " type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
