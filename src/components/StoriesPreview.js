import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "../styles/Stories.module.css";
import axios from 'axios';

function StoriesPreview() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('/stories/', {
                    params: {
                        limit: 3  
                    }
                });
                if (Array.isArray(response.data.results)) {
                    setStories(response.data.results);
                } else {
                    console.error("Fetched data is not an array:", response.data);
                }
            } catch (error) {
                console.error("There was an error fetching the stories!", error);
            }
        };

        fetchStories();
    }, []);

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
                <div className="text-center mt-4">
                    <Button variant="outline-primary" as={Link} to="/stories">View More Stories</Button>
                </div>
            </Container>
        </section>
    );
}

export default StoriesPreview;
