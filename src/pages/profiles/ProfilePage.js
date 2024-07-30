import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, Image } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import AvatarComponent from "../../components/Avatar"; // Ensure correct path
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { fetchMoreData } from "../../utils/utils";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
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
      <Row className={styles.ProfileMain}>
        <Col lg={3} className="text-lg-left">
          <div className={styles.AvatarWrapper}>
            <AvatarComponent
              src={profile?.image}
              text={profile?.owner}
              height={150}
              showInitialOnly={!profile?.image} 
              showName={false} // Hide name on the profile page
            />
          </div>
        </Col>
        <Col lg={6} className={styles.ProfileDetails}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className={`${styles.ProfileStats} justify-content-center no-gutters`}>
            <Col xs={4} sm={3} className={`${styles.ProfileStat} my-2`}>
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} sm={3} className={`${styles.ProfileStat} my-2`}>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} sm={3} className={`${styles.ProfileStat} my-2`}>
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className={styles.ProfileActions}>
          {is_owner && <ProfileEditDropdown id={profile?.id} />}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
      </Row>
      {profile?.content && (
        <Row className="mt-3">
          <Col className={styles.ProfileContent}>{profile.content}</Col>
        </Row>
      )}
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          dataLength={profilePosts.results.length}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
          hasMore={!!profilePosts.next}
          loader={<Asset spinner />}
        >
          <div className={styles.PostGrid}>
            {profilePosts.results.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`} className={styles.PostGridItem}>
                <Image src={post.image} alt={post.title} thumbnail />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Container className={appStyles.Content}>
      {hasLoaded ? (
        <>
          {mainProfile}
          {mainProfilePosts}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default ProfilePage;