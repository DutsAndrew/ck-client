import React, { FC } from 'react';
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import ProjectsNav from './ProjectsNav';
import ProjectViewer from './ProjectViewer';
import { projectsAndTasksDashboardProps } from '../../types/calendarTypes';
import AllProjectsViewer from './AllProjectsViewer';
import AllTeamsViewer from './AllTeamsViewer';

const Dashboard:FC<projectsAndTasksDashboardProps> = (props): JSX.Element => {

  const { user } = props;

  // display all projects and teams in their own respective rows
    // if a user clicks on a Project or a Team pull up the viewer component for it
    // once in the project or team viewer users can move through any teams or projects they have access to
    // users can navigate back to the dashboard with a home button
    // plus sign is always present in the project nav bar to add teams or projects

  return (
    <main>
      <AllProjectsViewer />
      <AllTeamsViewer />
    </main>
  );
};

export default Dashboard;