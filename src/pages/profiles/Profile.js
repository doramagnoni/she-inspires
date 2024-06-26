import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div className={`${styles.Profile} ${mobile && styles.ProfileMobile}`}>
      <div>
        <Link to={`/profiles/${id}`}>
          <Image
            className={`${styles.ProfileImage}`}
            roundedCircle
            src={image}
            alt={`${owner}'s profile picture`}
          />
        </Link>
      </div>
      <div className={`${styles.WordBreak}`}>
        <strong>{owner}</strong>
        {!mobile && (
          <div className={`${styles.ButtonContainer}`}>
            {currentUser && !is_owner && (
              following_id ? (
                <Button
                  className={`${styles.Button} ${styles.BlackOutline}`}
                  onClick={() => handleUnfollow(profile)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  className={`${styles.Button} ${styles.Black}`}
                  onClick={() => handleFollow(profile)}
                >
                  Follow
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
