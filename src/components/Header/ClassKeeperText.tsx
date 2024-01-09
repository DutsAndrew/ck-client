import React from "react";
import styles from '../../styles/components/Header/classKeeperText.module.css'

// inspired by: https://codepen.io/ostylowany/pen/vYzPVZL

const classKeeperText = () => {
  return (
    <div className={styles.classKeeperContainer}>
      <h1 className={styles.classKeeperTitle}>ClassKeeper
        <div className={styles.classKeeperAurora}>
          <div className={styles.classKeeperAuroraItem}></div>
          <div className={styles.classKeeperAuroraItem}></div>
          <div className={styles.classKeeperAuroraItem}></div>
          <div className={styles.classKeeperAuroraItem}></div>
        </div>
      </h1>
    </div>
  );
};

export default classKeeperText;