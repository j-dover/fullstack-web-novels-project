import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './pages/UserProfile';
import BrowseStories from './pages/BrowseStories';
import LogIn from './pages/LogIn';
import NavBar from './components/common/NavBar';
import { Container } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Container>
          <Route path="/user/:username/stories" component={UserProfile}/>
          <Route path="/stories" component={BrowseStories}/>
          <Route path="/login" component={LogIn}/>
        </Container>
      </div>
    </Router>
  );
}

export default App;
