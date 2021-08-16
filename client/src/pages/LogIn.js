import React, { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import LoginForm from '../components/common/LoginForm';
// import NavBar from '../components/common/NavBar';

const LogIn = () => {
  return (
    <div className="login">
      <h1>Log In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default LogIn;