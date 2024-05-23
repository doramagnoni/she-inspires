
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 

// Placeholder components 
function HomePage() { return <div>Home Page Content</div>; }
function Stories() { return <div>Stories Page Content</div>; }
function Resources() { return <div>Resources Page Content</div>; }
function Community() { return <div>Community Page Content</div>; }

function App() {
  return (
    <BrowserRouter> 
      <NavBar /> {}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;