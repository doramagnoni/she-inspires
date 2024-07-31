import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Stories.module.css";
import { axiosReq } from "../api/axiosDefaults";
import Asset from "./Asset";

function Stories() {
  const [stories, setStories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosReq.get("/stories/");

        if (response.data && Array.isArray(response.data.results)) {
          setStories(response.data.results);
          setHasLoaded(true);
        } else {
          console.error(
            "No 'results' array found in response data:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchStories();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={styles["featured-stories"]}>
      <Container>
        <h2 className={styles["section-title"]}>
          Inspiring Stories You'll Love
        </h2>
        {hasLoaded ? (
          <Row>
            {stories.map((story) => (
              <Col key={story.id} xs={12} md={6} lg={4}>
                <Card className={styles.card}>
                  <Card.Img
                    variant="top"
                    src={story.image}
                    className={styles["card-img-top"]}
                  />
                  <Card.Body>
                    <Card.Title className={styles["card-title"]}>
                      {story.title}
                    </Card.Title>
                    <Card.Text className={styles["card-text"]}>
                      {story.content.substring(0, 100)}...
                    </Card.Text>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/stories/${story.id}`}
                      className={styles["btn-read-more"]}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100px" }}
          >
            <Asset spinner />
          </Container>
        )}
      </Container>
    </section>
  );
}

export default Stories;
