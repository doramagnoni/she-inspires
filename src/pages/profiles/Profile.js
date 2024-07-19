import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import AvatarComponent from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile } = props;
  const { id, following_id, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div className={`${styles.Profile} ${mobile && styles.ProfileMobile}`}>
      <div>
      <Link className={styles.noUnderline} to={`/profiles/${id}`}>
      <AvatarComponent src={currentUser?.profile_image} text={currentUser?.username} height={45} /> 
      </Link>
        
      </div>
      <div className={`${styles.WordBreak}`}>
        
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
