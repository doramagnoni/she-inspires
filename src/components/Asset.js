import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" className={styles.spinnerBorder} />
        </div>
      )}
      {src && <img src={src} alt={message} />}
      {message && <p className={styles.spinnerMessage}>{message}</p>}
    </div>
  );
};

export default Asset;
