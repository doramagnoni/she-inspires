import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "../styles/Hero.module.css";
import StoriesPreview from './StoriesPreview';


function Hero({ stories }) {
  return (
    <div className={styles.Hero}> 
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <h1>She Inspires</h1>
            <p className="lead">Empowering women through stories and connection.</p>
            <Button variant="primary" as={Link} to="/stories" className="discover-btn">Discover Stories</Button>
          </Col>
        </Row>
      </Container>
      {stories && stories.length > 0 && <StoriesPreview stories={stories} />}
    </div>
  );
}

export default Hero;