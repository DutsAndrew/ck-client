import React, { useState } from 'react';
import styles from '../../styles/components/AnnouncementBar/announcements.module.css';
import closeIcon from '../../assets/close.svg';

const AnnouncementBar = () => {

  const [announcementBar, setAnnouncementBar] = useState({
    status: true,
  });

  const handleUserRequestToCloseAnnouncementBar = () => {
    setAnnouncementBar({
      status: false,
    });
  };

  if (announcementBar.status === true) {
    return (
      <section className={styles.announcementBar}>
        <img 
          src={closeIcon}
          className={styles.closeIcon}
          onClick={() => handleUserRequestToCloseAnnouncementBar()}
          alt='close button'>
        </img>
        <p className={styles.announcementText}>
          Update: We have added the necessary feature that does ____.
        </p>
      </section>
    );
  } else {
    return (
      <></>
    );
  };
};

export default AnnouncementBar;