import React, { FC } from 'react';
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { projectViewerProps } from '../../types/projectAndTaskTypes';

// all projects will be in the kanban board format

const ProjectViewer: FC<projectViewerProps> = (props): JSX.Element => {

  const { changeCurrentView } = props;

  return (
    <main>
      <p>
        Project Viewer
      </p>
    </main>
  );
};

export default ProjectViewer;