import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "../styles/Stories.module.css";

function Stories({ stories }) {
    return (
        <section className={styles['featured-stories']}>
            <Container>
                <h2 className={styles['section-title']}>Inspiring Stories You'll Love</h2>
                <Row>
                    {stories.map((story) => (
                        <Col key={story.id} xs={12} md={6} lg={4}>
                            <Card className={styles.card}>
                                <Card.Img variant="top" src={story.image_url} className={styles['card-img-top']} />
                                <Card.Body>
                                    <Card.Title className={styles['card-title']}>{story.title}</Card.Title>
                                    <Card.Text className={styles['card-text']}>{story.summary}</Card.Text>
                                    <Button variant="primary" as={Link} to={`/stories/${story.id}`} className={styles['btn-read-more']}>
                                        Read More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* View More Button */}
                <div className="text-center mt-4">
                    <Button variant="outline-primary" as={Link} to="/stories">View More Stories</Button>
                </div>
            </Container>
        </section>
    );
}


export default Stories; 
