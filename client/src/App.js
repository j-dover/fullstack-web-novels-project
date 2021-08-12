import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './pages/UserProfile';
import NavBar from './components/common/NavBar';
import { Container } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Container>
        <UserProfile/>
      </Container>
    </div>
  );
}

export default App;
