import React from 'react';
import styles from '../../styles/components/Dashboard/dashboard.module.css';

const UserStats = () => {
  return (
    <div
      className={styles.dashboardSnapShotContainer}
      id={styles.dashboardUserStatsView}>
      <p>
        User Stats
      </p>
    </div>
  );
};

export default UserStats;