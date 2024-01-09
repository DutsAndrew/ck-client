import React, { FC } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { allTeamsViewerProps } from "../../types/projectAndTaskTypes";

const AllTeamsViewer: FC<allTeamsViewerProps> = (props): JSX.Element => {

  const { changeCurrentView } = props;

  return (
    <section className={styles.allTeamsViewerContainer}>
      <h2 className={styles.allTeamsHeaderText}>
        Teams
      </h2>
    </section>
  );
};

export default AllTeamsViewer;