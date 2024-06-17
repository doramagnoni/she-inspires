import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom"; 
import React, { useState, useEffect } from 'react';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Hero from './components/Hero';
import Stories from './components/Stories';
import Forum from './components/Forum'; 
import Community from './components/Community'; 

function App() {
  const [stories, setStories] = useState([]);
  

  useEffect(() => {
    // placeholder data
    setStories([
      { id: 1, title: "Story 1", summary: "Summary of Story 1", image_url: "https://via.placeholder.com/300" },
      { id: 2, title: "Story 2", summary: "Summary of Story 2", image_url: "https://via.placeholder.com/300" },
      { id: 3, title: "Story 3", summary: "Summary of Story 3", image_url: "https://via.placeholder.com/300" }
    ]);
  }, []); 

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={
            <>  
              <Hero />  
              <Stories stories={stories} /> 
            </>
          }/>
          <Route path="/signin" element={<SignInForm />} /> 
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/resources" element={<Forum />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<p>Page not found!</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;