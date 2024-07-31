import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import AvatarComponent from "../../components/Avatar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profile_id } = props;
  const [content, setContent] = useState("");
  const currentUser = useCurrentUser();

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      className={`mt-2 ${styles.CommentCreateForm}`}
      onSubmit={handleSubmit}
    >
      <Link to={`/profiles/${profile_id}`} className={styles.noUnderline}>
        <AvatarComponent
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={45}
          showInitialOnly={true}
        />
      </Link>
      <InputGroup className={styles.InputGroup}>
        <Form.Control
          className={styles.Form}
          placeholder="my comment..."
          as="textarea"
          value={content}
          onChange={handleChange}
          rows={2}
        />
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          post
        </button>
      </InputGroup>
    </Form>
  );
}

export default CommentCreateForm;
