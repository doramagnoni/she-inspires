import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { useParams, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ProfileEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

function ProfileEditForm() {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const imageInput = useRef(null);

  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({
    username: "",
    content: "",
    image: "",
  });
  const { username, content, image } = profileData;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfileData({
          username: data.owner,
          content: data.content,
          image: data.image,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfileData();
  }, [id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("content", content);

    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      if (currentUser && currentUser.id === id) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          profile_image: data.image,
        }));
      }
      navigate(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={styles.Container}>
        <Row>
          <Col md={12}>
            <div className={styles.ProfileImageWrapper}>
              <img
                src={profileData.image}
                alt="Profile"
                className={styles.ProfileImage}
              />
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.ChangeImageButton}`}
                htmlFor="image-upload"
              >
                Change the image
              </Form.Label>
              <Form.Control
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                style={{ display: "none" }}
              />
            </div>

            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className={styles.FormControl}
              />
              {errors?.username?.map((message, idx) => (
                <Alert variant="warning" key={idx} className={styles.Alert}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
                className={styles.FormControl}
              />
              {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx} className={styles.Alert}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <div>
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline} ${styles.CancelButton}`}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black} ${styles.SaveButton}`}
                type="submit"
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default ProfileEditForm;
