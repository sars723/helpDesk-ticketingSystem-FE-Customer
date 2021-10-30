import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import "./Profile.css";

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
  return (
    <div className="profile-detail container-fluid">
      <div className="row  ">
        <div className="col-md-6 pr-5 mx-auto ">
          <div className="profile-content">
            <Form>
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
  );
};

export default connect(mapStateToProps)(Profile);
