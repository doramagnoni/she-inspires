import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import logo from "../assets/logo.png";


function NavBar() {
    return (
        <Navbar expand="md">
            <Container>
            <Navbar.Brand>
          <img src={logo} alt="logo" height="60" />
        </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto text-left"> 
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/stories">Stories</Nav.Link>
                        <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
                        <Nav.Link as={Link} to="/community">Community</Nav.Link>
                        <Nav.Link as={Link} to="/sign-in">Sign in</Nav.Link>
                        <Nav.Link as={Link} to="/sign-up">Sign up</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
 