import React from "react";
import styles from '../styles/pages/loadingBar.module.css';

const LoadingBar = () => {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.loadingMessage}>
        Loading!
      </p>
      <div className={styles.loadingBar}></div>
    </div>
  );
};

export default LoadingBar;