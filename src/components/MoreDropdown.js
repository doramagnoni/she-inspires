import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useNavigate } from "react-router-dom";



const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));
const dropdownMenuStyle = {
    backgroundColor: "#f0f0f0",
    position: "absolute",
    left: 0,
    top: "100%",
  };

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} className={styles.dropdownToggle} />

      <Dropdown.Menu
        style={dropdownMenuStyle}
        className={`dropdown-menu ${styles.dropdownMenu}`}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit}>
          <i className="fas fa-edit" /> Edit
        </Dropdown.Item>

        <Dropdown.Item className={styles.DropdownItem} onClick={handleDelete}>
          <i className="fas fa-trash-alt" /> Delete
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const navigate = useNavigate();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} className={styles.dropdownToggle} />
      <Dropdown.Menu
        style={dropdownMenuStyle}
        className={`dropdown-menu ${styles.dropdownMenu}`}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" /> Change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" /> Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

