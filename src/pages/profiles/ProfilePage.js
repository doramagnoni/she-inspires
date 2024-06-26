import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner=${id}`), // Updated endpoint
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage} roundedCircle src={profile?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser && !is_owner && (
            <Button
              className={`${btnStyles.Button} ${
                profile?.following_id ? btnStyles.BlackOutline : btnStyles.Black
              }`}
              onClick={() => {}}
            >
              {profile?.following_id ? "unfollow" : "follow"}
            </Button>
          )}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const fetchMoreData = async () => {
    try {
      if (!profilePosts.next) return;
      const response = await axiosReq.get(profilePosts.next);
      setProfilePosts((prevPosts) => ({
        ...prevPosts,
        results: [...prevPosts.results, ...response.data.results],
        next: response.data.next,
      }));
    } catch (err) {
      console.error("Error fetching more data:", err);
    }
  };

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              <hr />
              <p className="text-center">{profile?.owner}'s posts</p>
              <hr />
              {profilePosts.results.length > 0 ? (
                <InfiniteScroll
                  dataLength={profilePosts.results.length}
                  next={fetchMoreData}
                  hasMore={!!profilePosts.next}
                  loader={<Asset spinner />}
                  className="row g-4"
                >
                  {profilePosts.results.map((post) => (
                    <Col key={post.id}>
                      <a href={`/posts/${post.id}`}>
                        <Image src={post.image} fluid />
                      </a>
                    </Col>
                  ))}
                </InfiniteScroll>
              ) : (
                <Asset
                  src={NoResults}
                  message={`No photos found for ${profile?.owner}.`}
                />
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
