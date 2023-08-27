import React from 'react';
import styles from '../../styles/components/Dashboard/dashboard.module.css';

const UpcomingEvents = () => {
  return (
    <div
      className={styles.dashboardSnapShotContainer}
      id={styles.dashboardUpcomingEventsView}>
      <p>
        Upcoming Events
      </p>
    </div>
  );
};

export default UpcomingEvents;