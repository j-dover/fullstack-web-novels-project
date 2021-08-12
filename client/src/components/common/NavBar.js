import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

function NavBar() {
  const [chapters, setChapters] = useState();


  return(
    <div>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Webvel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/stories">Link</Nav.Link>
              <Nav.Link href="#"></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;