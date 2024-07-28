import React, { useState } from "react";
import { Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AvatarComponent from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import Asset from "../../components/Asset";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image, 
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setLoading(true);
      try {
        await axiosRes.delete(`/posts/${id}/`);
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const handleLike = async () => {
    setLoading(true);
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleUnlike = async () => {
    setLoading(true);
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Card className={`${styles.Post}`}>
      <Card.Body className={styles.PostBody}>
        <Row className={`${styles.PostHeader} align-items-center justify-content-between`}>
          <Col xs="auto">
            <div className="d-flex align-items-center">
              <Link to={`/profiles/${profile_id}`} className={styles.noUnderline}>
                <AvatarComponent src={profile_image} text={owner} height={45} /> 
              </Link>
              <span className="mx-2">•</span>
              <span className="ml-2 text-muted">{updated_at}</span>
              {is_owner && postPage && (
                <Col xs="auto" className="d-flex justify-content-end">
                  <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
                </Col>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {loading ? (
          <Asset spinner />
        ) : (
          <>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {content && <Card.Text>{content}</Card.Text>}
            <div className={styles.PostBar}>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              )}
              {likes_count}
              {currentUser ? (
                <Link to={`/posts/${id}`}>
                  <i className="far fa-comments" />
                </Link>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to comment on posts!</Tooltip>}
                >
                  <i className="far fa-comments" />
                </OverlayTrigger>
              )}
              {comments_count}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Post;
