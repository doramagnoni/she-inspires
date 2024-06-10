import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import validator from 'validator';

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  
   
    if (event.target.name === 'password1') {
      const passwordErrors = [];
      if (!validator.isLength(event.target.value, { min: 8 })) {
        passwordErrors.push('Password must be at least 8 characters long.');
      }
    
      if (!validator.isStrongPassword(event.target.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
      })) {
        passwordErrors.push('Password must contain at least one uppercase letter, lowercase letter, number, and symbol.');
      }
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        password1: passwordErrors.length > 0 ? passwordErrors : null,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: null,
      }));
    }
  };

  const handleSubmit = async (event) => {
    console.log("Form submitted!");
    event.preventDefault();
    if (password1 !== password2) {
        setErrors({ password2: ["Passwords don't match"]});
        return; 
    }
  
    console.log("Sending data:", signUpData);
  
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (error) {
        console.error("Error during request:", error.response.data);
        setErrors({}); 
        setGeneralError("An unexpected error occurred. Please try again.");
        console.error("Error during request:", error.response); // Log error response
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
              {errors.password1?.length > 0 && (
                errors.password1.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))
              )}
            </Form.Group>

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>

           
           {generalError && (
              <Alert variant="danger" className="mt-3">
                {generalError}
              </Alert>
            )} 
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
     
    </Row>
  );
};

export default SignUpForm;

