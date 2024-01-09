import React, { FC } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { allProjectsViewerProps } from "../../types/projectAndTaskTypes";

const AllProjectsViewer: FC<allProjectsViewerProps> = (props): JSX.Element => {

  const { changeCurrentView } = props;

  return (
    <section className={styles.allProjectsViewerContainer}>
      <h2 className={styles.allProjectsHeaderText}>
        Projects
      </h2>
    </section>
  );
};

export default AllProjectsViewer;