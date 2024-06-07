import styles from "./App.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom"; 
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";




function App() {
  return (
    <div className={styles.App}>
    <NavBar />
      <Container className={styles.Main}>
        <Routes> 
        <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route render={() => <p>Page not found!</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;