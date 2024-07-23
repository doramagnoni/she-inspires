import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();

  // Filter out the current user's profile from popular profiles
  const filteredProfiles = popularProfiles.results.filter(
    (profile) => profile.id !== currentUser?.profile_id
  );

  // Create a profile object for the current user
  const currentUserProfile = currentUser
    ? {
        id: currentUser.profile_id,
        owner: currentUser.username,
        image: currentUser.profile_image,
      }
    : null;

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {!mobile && currentUserProfile && (
        <>
          <Profile profile={currentUserProfile} />
          <hr />
        </>
      )}
      {filteredProfiles.length ? (
        <>
          <p>Suggested for you</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {filteredProfiles.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            filteredProfiles.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
