import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Hero from './components/Hero';
import Stories from './components/Stories';
import Forum from './components/Forum'; 
import Community from './components/Community'; 
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import axios from 'axios';
import { useCurrentUser } from "./contexts/CurrentUserContext";




function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('/stories/');
        setStories(response.data);
      } catch (error) {
        console.error("There was an error fetching the stories!", error);
      }
    };

    fetchStories();
  }, []);


  return (

          <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero stories={stories} />
                    <Stories stories={stories} />
                  </>
                } />
                <Route path="/" element={<PostsPage message="No results found. Adjust the search keyword." />} />
                <Route path="/feed" element={<PostsPage message="No results found. Adjust the search keyword or follow a user." filter={`owner__followed__owner__profile=${profile_id}&`} />} />
                <Route path="/liked" element={<PostsPage message="No results found. Adjust the search keyword or like a post." filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/stories" element={<Stories stories={stories} />} />
                <Route path="/resources" element={<Forum />} />
                <Route path="/community" element={<Community />} />
                <Route path="/posts/create" element={<PostCreateForm />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="*" element={<p>Page not found!</p>} />
              </Routes>
            </Container> 
          </div>
  );
}

export default App;