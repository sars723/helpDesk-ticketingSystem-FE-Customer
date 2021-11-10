import React from "react";
import "./Login.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUserAction } from "../redux/actions";
import logo from "../components/assets/helpDeskLogo.png";
const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/users/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const token = await response.json();
        window.localStorage.setItem("AccessToken", token.accessToken);
        /* window.localStorage.setItem("RefreshToken", token.refreshToken); */

        dispatch(setCurrentUserAction());

        alert("successfully logged in");
        props.history.push("/home");
      } else {
        alert("sth during login");
      }
    } catch ({ error }) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="login ">
        {" "}
        <div className="nav-login">
          <div className="row">
            <div className="col-12">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
        <div className="login-container">
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">
              <span className="font-weight-bold ">HelpDeskTS</span>.com
            </h2>
            <p className="no-account text-center">
              Don't have an account?
              <span className="no-account-signup">
                {" "}
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <span className="show-password">Show Password</span>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <span className="forget-password">Forget my password</span>
            <Form.Group>
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button className="btn-login" type="submit">
              Log in
            </Button>
            <hr />
            <div className="btn-login-google">
              <Button variant="primary">Login with Google</Button>
            </div>
            <div className="btn-login-facebook">
              <Button>Login with Facebook</Button>
            </div>
          </Form>
        </div>
        <div className="footer">
          <span>©2021 HelpDesk, Inc. All Rights Reserved.</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </main>
  );
};

export default Login;
