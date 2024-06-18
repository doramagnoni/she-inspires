import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

 const loggedInIcons = (
    <>
      <Nav.Link as={NavLink} to="/profile" className={styles.NavLink}>
        {currentUser?.username}
      </Nav.Link>
      <Nav.Link as={NavLink} to="/stories" className={styles.NavLink}>
        Stories
      </Nav.Link>
      <Nav.Link as={NavLink} to="/forum" className={styles.NavLink}>
        Forum
      </Nav.Link>
      <Nav.Link as={NavLink} to="/community" className={styles.NavLink}>
        Community
      </Nav.Link>
    </>
  );
  
  const loggedOutIcons = (
    <>
      <Nav.Link as={NavLink} to="/signin" className={styles.NavLink}>
        Sign in
      </Nav.Link>
      <Nav.Link as={NavLink} to="/signup" className={styles.NavLink}>
        Sign up
      </Nav.Link>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
          <Nav.Link as={NavLink} to="/" exact="true" className={styles.NavLink}>
           Home
          </Nav.Link>
            {currentUser && currentUser.username ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default NavBar;