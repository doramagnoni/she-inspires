import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };


 const loggedInIcons = (
    <>
      <Nav.Link as={NavLink} to="/stories" className={styles.NavLink}> <i className="fas fa-book-open"></i>
        Stories
      </Nav.Link>
      <Nav.Link as={NavLink} to="/forum" className={styles.NavLink}> <i className="fas fa-comments"></i>
        Forum
      </Nav.Link>
      <Nav.Link as={NavLink} to="/community" className={styles.NavLink}> <i className="fas fa-users"></i>
        Community
      </Nav.Link>

      <Nav.Link as={NavLink} to="/posts/create" className={styles.NavLink}>
       <i className="fas fa-plus-square"></i> Post
      </Nav.Link>
      <Nav.Link as={NavLink} to="/feed" className={styles.NavLink}>
       <i className="fas fa-stream"></i> Feed
      </Nav.Link>
      <Nav.Link as={NavLink} to="/liked" className={styles.NavLink}>
       <i className="fas fa-heart"></i> Liked
      </Nav.Link>

      <Nav.Link as={NavLink} to="/profile" className={`${styles.NavLink} ${styles.ProfileLink}`}>
        {currentUser?.username}
        <img
          src={currentUser?.profile_image}
          alt="Profile"
          className={styles.ProfileImage}
        />
      </Nav.Link>
      <Nav.Link as={NavLink} to="/" onClick={handleSignOut} className={styles.NavLink}>
        <i className="fas fa-sign-out-alt"></i> Sign out
      </Nav.Link>
    </>
  );
  
  const loggedOutIcons = (
    <>
      <Nav.Link as={NavLink} to="/signin" className={styles.NavLink}><i className="fas fa-sign-in-alt"></i>
        Sign in
      </Nav.Link>
      <Nav.Link as={NavLink} to="/signup" className={styles.NavLink}><i className="fas fa-user-plus"></i>
        Sign up
      </Nav.Link>
      
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
         <span className={styles.Title}>She Inspires.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
          <Nav.Link as={NavLink} to="/" exact="true" className={styles.NavLink}><i className="fas fa-home"></i>
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