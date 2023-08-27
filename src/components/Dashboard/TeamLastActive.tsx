import React from 'react';
import styles from '../../styles/components/Dashboard/dashboard.module.css';

const TeamLastActive = () => {
  return (
    <div
      className={styles.dashboardSnapShotContainer}
      id={styles.dashboardTeamsLastActiveView}>
      <p>
        Teams Last Active
      </p>
    </div>
  );
};

export default TeamLastActive;