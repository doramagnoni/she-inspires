import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom"; 
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Hero from './components/Hero';
import Stories from './components/Stories';
import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function App() {
  const [stories, setStories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      console.log('User data fetched:', data);
      setCurrentUser(data);
    } catch (err) {
      console.log('Error fetching user data:', err);
      if (err.response && err.response.status === 401) {
        //handle unauthenticated state
        
      }
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    // placeholder data
    setStories([
      { id: 1, title: "Story 1", summary: "Summary of Story 1", image_url: "https://via.placeholder.com/300" },
      { id: 2, title: "Story 2", summary: "Summary of Story 2", image_url: "https://via.placeholder.com/300" },
      { id: 3, title: "Story 3", summary: "Summary of Story 3", image_url: "https://via.placeholder.com/300" }
    ]);
  }, []); 

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <SetCurrentUserContext.Provider value={setCurrentUser}>
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
           <Route path="*" element={<p>Page not found!</p>} />
         </Routes>
       </Container>
     </div>
     </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
   );
}

export default App;