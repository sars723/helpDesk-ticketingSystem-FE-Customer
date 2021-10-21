import React from "react";
import "./Register.css";
import { Button, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register ">
      <div className="register-container">
        <Form>
          <h1 className="text-center">
            <span className="font-weight-bold ">Strive HelpDesk</span>.com
          </h1>
          <p className="no-account text-center">
            Already have an account??
            <span className="have-account-login">
              {" "}
              <Link to="/login">Log in</Link>
            </span>
          </p>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <span className="show-password">Show Password</span>
            <Form.Control type="email" />
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
  );
};

export default Register;
