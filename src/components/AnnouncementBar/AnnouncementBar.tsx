import React from 'react';
import styles from '../../styles/components/AnnouncementBar/announcements.module.css';
import closeIcon from '../../assets/close.svg';

const AnnouncementBar = () => {
  return (
    <section className={styles.announcementBar}>
      <img src={closeIcon} className={styles.closeIcon} alt='close button'></img>
      <p className={styles.announcementText}>
        Update: We have added the necessary feature that does ____.
      </p>
    </section>
  );
};

export default AnnouncementBar;