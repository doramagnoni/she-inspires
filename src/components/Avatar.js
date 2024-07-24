// src/components/Avatar.js
import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "../styles/Avatar.module.css";

const AvatarComponent = ({ src, height = 45, text, showInitialOnly = false }) => {
  const displayInitial = text && text.charAt(0).toUpperCase();
  
  return (
    <span className="d-flex align-items-center">
      <Avatar
        className={styles.Avatar}
        style={{ height: height, width: height, fontSize: height * 0.4 }}
      >
        {displayInitial}
      </Avatar>
      {!showInitialOnly && text && <span className="ml-2">{text}</span>}
    </span>
  );
};

export default AvatarComponent;
