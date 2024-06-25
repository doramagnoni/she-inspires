import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";


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

