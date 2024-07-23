import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import Asset from './Asset';
import styles from "../styles/StoryDetail.module.css";

function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const { data } = await axiosReq.get(`/stories/${id}`);
        setStory(data);
        setHasLoaded(true);
      } catch (error) {
        console.error('Error fetching the story:', error);
      }
    };

    setHasLoaded(false);
    fetchStory();
  }, [id]);

  return (
    <Container className={styles['story-detail']}>
      {hasLoaded ? (
        story ? (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className={styles.storyCard}>
                <Card.Img variant="top" src={story.image} className={styles['card-img-top']} />
                <Card.Body>
                  <Card.Title className={styles['card-title']}>{story.title}</Card.Title>
                  <Card.Text className={styles['card-text']}>{story.content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Story not found.</p>
        )
      ) : (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default StoryDetail;
