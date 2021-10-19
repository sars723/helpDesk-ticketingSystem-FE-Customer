import React from "react";
import "./Login.css";
import { Button, Form, FormGroup, Label, Input } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <div className="login ">
      <div className="login-container">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center">
            <span className="font-weight-bold ">Strive HelpDesk</span>.com
          </h1>
          <p className="no-account text-center">
            Don't have an account?
            <span className="no-account-signup">
              {" "}
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" vlaue={email} onChange={e=>setEmail(e.target.value)} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <span className="show-password">Show Password</span>
            <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
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
  );
};

export default Login;
