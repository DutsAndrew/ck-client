import React, { FC, useState } from 'react';
import styles from '../../styles/components/AnnouncementBar/announcements.module.css';
import closeIcon from '../../assets/close.svg';
import { announcementBarProps } from '../../types/interfaces';

const AnnouncementBar: FC<announcementBarProps> = (props): JSX.Element => {

  const { auth } = props;

  const [announcementBar, setAnnouncementBar] = useState({
    status: true,
  });

  const handleUserRequestToCloseAnnouncementBar = () => {
    setAnnouncementBar({
      status: false,
    });
  };

  if (announcementBar.status === true && auth === false) {
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