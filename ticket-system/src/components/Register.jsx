import React, { useState } from "react";
import "./Register.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../components/assets/helpDeskLogo.png";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        process.env.REACT_APP_BE_URL + "/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        alert("Successfully registerd");
        const data = await response.json();
        window.localStorage.setItem("id", data);
        props.history.push("/login");
      } else {
        alert("sth wrong with registering");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="register ">
        <div className="nav-register">
          <div className="row">
            <div className="col-12">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
        <div className="register-container">
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">
              <span className="font-weight-bold ">HelpDeskTS</span>.com
            </h2>
            <p className="have-account text-center">
              Already have an account?{"  "}
              <span className="have-account-login">
                {" "}
                <Link to="/login"> Log in</Link>
              </span>
            </p>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={user.username}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <span className="show-password">Show Password</span>
              <Form.Control
                type="password"
                value={user.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Form.Group>
            <span className="forget-password">Forget my password</span>
            <Form.Group>
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button className="btn-create-account" type="submit">
              Create account
            </Button>
          </Form>
        </div>
        <div className="footer">
          <span>©2021 Strive HelpDesk, Inc. All Rights Reserved.</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </main>
  );
};

export default Register;
