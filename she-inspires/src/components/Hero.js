import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "../styles/Hero.module.css"

function Hero() {
  return (
    <div className={styles.Hero}> 
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <h1>She Inspires</h1>
            <p className="lead">Empowering women through stories and connection.</p>
            <Button variant="primary" as={Link} to="/stories">Discover Stories</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;