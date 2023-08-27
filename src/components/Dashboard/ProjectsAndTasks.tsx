import React from 'react';
import styles from '../../styles/components/Dashboard/dashboard.module.css';

const ProjectsAndTasks = () => {
  return (
    <div
      className={styles.dashboardSnapShotContainer}
      id={styles.dashboardProjectsAndTasksView}>
      <p>
        Projects and Tasks
      </p>
    </div>
  );
};

export default ProjectsAndTasks;