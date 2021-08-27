import React, { useEffect, useState } from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import LoginForm from '../components/common/LoginForm';
import SignInForm from '../components/common/SignInForm';

const LogIn = () => {

  // Use state to toggle between forms

  return (
    <div className="login">
      <Card>
        <Card.Header as="h5">Featured</Card.Header>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <LoginForm/>
          <Card.Text>
          Don't have an account? <a href="#">Create one.</a>
          </Card.Text>
          {/* <Button variant="primary">Log In</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LogIn;