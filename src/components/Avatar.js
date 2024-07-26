import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "../styles/Avatar.module.css";

const AvatarComponent = ({ src, height = 45, text, showInitialOnly = false }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const displayInitial = text && text.charAt(0).toUpperCase();

  useEffect(() => {
    // Cache busting
    const avatarUrl = src ? `${src}?${new Date().getTime()}` : "";
    setImageSrc(avatarUrl);
  }, [src]);

  return (
    <span className="d-flex align-items-center">
      <Avatar
        className={styles.Avatar}
        src={imageSrc}
        alt={text}
        style={{ height: height, width: height, fontSize: height * 0.4 }}
      >
        {!src && displayInitial}
      </Avatar>
      {!showInitialOnly && text && <span className="ml-2">{text}</span>}
    </span>
  );
};

export default AvatarComponent;
