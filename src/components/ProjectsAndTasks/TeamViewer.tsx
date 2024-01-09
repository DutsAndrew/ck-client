import React, { FC } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { teamViewerProps } from "../../types/projectAndTaskTypes";

const TeamViewer: FC<teamViewerProps> = (props): JSX.Element => {

  const { changeCurrentView } = props;

  return (
    <p>
      Team Viewer
    </p>
  );
};

export default TeamViewer;