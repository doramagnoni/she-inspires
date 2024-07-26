import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import styles from "../../styles/PostCreateEditForm.module.css"; 
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        setPostData({
          title: data.title,
          content: data.content,
          image: data.image,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleImageClick = () => {
    imageInput.current.click();
  };

  const textFields = (
    <div className={`text-center ${styles.textFields}`}>
      <Form.Group>
        <Form.Label className={`${styles.customFormLabel}`}>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className={`${styles.customFormControl}`}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" className={`${styles.customAlert}`} key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className={`${styles.customFormLabel}`}>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          className={`${styles.customFormControl}`}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" className={`${styles.customAlert}`} key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.customButton}`}
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.customButton}`} type="submit">
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className={`py-2 p-0 p-md-2 ${styles.leftCol}`} md={7} lg={8}>
          <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image
                      className={`${appStyles.Image} ${styles.image}`}
                      src={image}
                      rounded
                      onClick={handleImageClick}
                      style={{ cursor: "pointer" }}
                    />
                  </figure>
                  <div>
                    <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label className="d-flex justify-content-center" onClick={handleImageClick} style={{ cursor: "pointer" }}>
                  <Asset message="Click or tap to upload an image" />
                </Form.Label>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                  style={{ display: "none" }}
                />
              </Form.Group>
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className={`d-none d-md-block p-0 p-md-2 ${styles.rightCol}`}>
          <Container className={`${appStyles.Content} ${styles.content}`}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
