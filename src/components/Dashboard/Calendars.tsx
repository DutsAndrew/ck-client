import React from 'react';
import styles from '../../styles/components/Dashboard/dashboard.module.css';

const Calendars = () => {
  return (
    <div 
      className={styles.dashboardSnapShotContainer}
      id={styles.dashboardCalendarView}>
      <p>
        Calendars
      </p>
    </div>
  );
};

export default Calendars;