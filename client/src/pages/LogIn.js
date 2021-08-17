import React, { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import LoginForm from '../components/common/LoginForm';
import SignInForm from '../components/common/SignInForm';

const LogIn = () => {

  // Use state to toggle between forms

  return (
    <div className="login">
      <LoginForm/>
      Don't have an account? Create one.
    </div>
  );
}

export default LogIn;