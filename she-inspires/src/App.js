import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Stories from './components/Stories';
import Resources from './components/Resources'; 
import Community from './components/Community'; 
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp';


function App() {
  const [stories, setStories] = useState([]); 

  useEffect(() => {
    
    setStories([
      { id: 1, title: "Story 1", summary: "Summary of Story 1", image_url: "https://via.placeholder.com/300" },
      { id: 2, title: "Story 2", summary: "Summary of Story 2", image_url: "https://via.placeholder.com/300" },
      { id: 3, title: "Story 3", summary: "Summary of Story 3", image_url: "https://via.placeholder.com/300" }
    ]);
  }, []); 

  return (
    <BrowserRouter> 
      <div className={styles.App}>
        <NavBar />
        <Routes>
          <Route path="/" element={ 
            <> 
              <Hero />  
              <Stories stories={stories} />
            </>
          }/>
          <Route path="/stories" element={<Stories />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/sign-in" element={<SignIn />} />  
          <Route path="/sign-up" element={<SignUp />} />  
          <Route render={() => <p>Page not found!</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;