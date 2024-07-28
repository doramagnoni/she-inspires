import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import AvatarComponent from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 45 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  console.log(`Rendering profile: ${owner}, mobile: ${mobile}`); // Debug log

  return (
    <div className={`${styles.Profile} ${mobile && styles.ProfileMobile}`}>
      <div className="d-flex align-items-center">
        <Link className={styles.noUnderline} to={`/profiles/${id}`}>
          <AvatarComponent 
            src={image} 
            height={imageSize} 
            text={owner} 
            showInitialOnly={!image} 
            showName={false} // Ensure name is not shown in AvatarComponent
          />
        </Link>
        {/* Render the name next to the avatar only for desktop */}
        {!mobile && <span className="ml-2"><strong>{owner}</strong></span>}
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
