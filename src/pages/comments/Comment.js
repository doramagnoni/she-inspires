import React, { useState } from "react";
import { Link } from "react-router-dom";
import AvatarComponent from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentBody}>
        <Link to={`/profiles/${profile_id}`} className={styles.noUnderline}>
          <div className={styles.AvatarWrapper}>
            <AvatarComponent src={profile_image} height={45} /> {/* Only display the avatar here */}
          </div>
        </Link>
        <div className={styles.CommentContent}>
          <div className={styles.CommentHeader}>
            <span className={styles.Owner}>{owner}</span> {/* Display username only once */}
            <span className={styles.Date}>{updated_at}</span>
          </div>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p className={styles.CommentText}>{content}</p>
          )}
        </div>

        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
