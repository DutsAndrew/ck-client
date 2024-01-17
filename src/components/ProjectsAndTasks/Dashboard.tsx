import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { projectsAndTasksDashboardProps } from '../../types/calendarTypes';
import NavBarProjectsAndTasks from './NavBarProjectsAndTasks';
import AllProjectsViewer from './AllProjectsViewer';
import AllTeamsViewer from './AllTeamsViewer';
import TeamViewer from './TeamViewer';
import ProjectViewer from './ProjectViewer';
import { removeToastNotificationsOnMount } from '../../scripts/closeAllToastNotifications';

const Dashboard:FC<projectsAndTasksDashboardProps> = (props): JSX.Element => {

  const { user } = props;

  const [currentView, setCurrentView] = useState('dashboard'),
        [formModalPreset, setFormModalPreset] = useState({
          mode: '',
          objectToEdit: {},
        }),
        [selectedTeam, setSelectedTeam] = useState({
          id: '',
        }),
        [selectedProject, setSelectedProject] = useState({
          id: '',
        });

  useEffect(() => {
    removeToastNotificationsOnMount();
  }, []);

  // display all projects and teams in their own respective rows
    // if a user clicks on a Project or a Team pull up the viewer component for it
    // once in the project or team viewer users can move through any teams or projects they have access to
    // users can navigate back to the dashboard with a home button
    // plus sign is always present in the project nav bar to add teams or projects

  const changeCurrentView = (newView: 'dashboard' | 'team' | 'project') => {
    setCurrentView(newView);
  };

  const getProjectAndTaskRenderElements = () => {
    if (currentView === 'dashboard') {
      return (
        <>
          <AllProjectsViewer 
            changeCurrentView={changeCurrentView}
          />
          <AllTeamsViewer 
            changeCurrentView={changeCurrentView}
          />
        </>
      );
    } else if (currentView === 'team') {
      return (
        <>
          <TeamViewer 
            changeCurrentView={changeCurrentView}
          />
        </>
      );
    } else if (currentView === 'project') {
      return (
        <>
          <ProjectViewer 
            changeCurrentView={changeCurrentView}
          />
        </>
      );
    } else {
      return (
        <>
          <AllProjectsViewer 
            changeCurrentView={changeCurrentView}
          />
          <AllTeamsViewer 
            changeCurrentView={changeCurrentView}
          />
        </>
      );
    };
  };

  return (
    <main className={styles.projectsAndTasksDashboardMain}>
      <NavBarProjectsAndTasks 
        formModalPreset={formModalPreset}
      />
      {getProjectAndTaskRenderElements()}
    </main>
  );
};

export default Dashboard;