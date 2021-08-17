import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function LogInForm() {

  return(
  <div>
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
  </>
  );
}

export default LogInForm;