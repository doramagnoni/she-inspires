import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import validator from "validator";
import IrisImage from "../../assets/iris.JPG";

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

    if (event.target.name === "password1") {
      const passwordErrors = [];
      if (!validator.isLength(event.target.value, { min: 8 })) {
        passwordErrors.push("Password must be at least 8 characters long.");
      }

      if (
        !validator.isStrongPassword(event.target.value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
          minNumbers: 1,
        })
      ) {
        passwordErrors.push(
          "Password must contain at least one uppercase letter, lowercase letter, number, and symbol."
        );
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
    event.preventDefault();
    if (password1 !== password2) {
      setErrors({ password2: ["Passwords don't match"] });
      return;
    }

    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (error) {
      console.error("Error during request:", error.response.data);
      setErrors({});
      setGeneralError("An unexpected error occurred. Please try again.");
      console.error("Error during request:", error.response);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container
          className={`${appStyles.Content} p-4 ${styles.FormContainer}`}
        >
          <h1 className={styles.Header}>Sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                isInvalid={!!errors.password1}
              />
              {errors.password1?.length > 0 &&
                errors.password1.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
            </Form.Group>

            <Form.Group controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
                isInvalid={!!errors.password2}
              />
              {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
              style={{ marginTop: "1rem" }}
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

        <Container
          className={`mt-3 ${appStyles.Content} ${styles.LinkContainer}`}
        >
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <img
          src={IrisImage}
          alt="Iris"
          className={`img-fluid ${styles.IrisImage}`}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
