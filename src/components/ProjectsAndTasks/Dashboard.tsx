import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { projectsAndTasksDashboardProps } from '../../types/projectAndTaskTypes';
import { useNavigate } from 'react-router-dom';
import NavBarProjectsAndTasks from './NavBarProjectsAndTasks';
import AllProjectsViewer from './AllProjectsViewer';
import AllTeamsViewer from './AllTeamsViewer';
import TeamViewer from './TeamViewer';
import ProjectViewer from './ProjectViewer';
import { removeToastNotificationsOnMount } from '../../scripts/closeAllToastNotifications';
import toast from 'react-hot-toast';

const Dashboard:FC<projectsAndTasksDashboardProps> = (props): JSX.Element => {

  const { 
    userId,
    teams,
    pendingTeams,
    buildUserProfileRef,
  } = props;

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

  const navigate = useNavigate();

  useEffect(() => {
    removeToastNotificationsOnMount();

    if (typeof userId === 'undefined') { // prevent user access if not logged in
      navigate('/login');
      return;
    };

    // handle data fetching logic if team data isn't present or available
    if (teams.length === 0 && pendingTeams.length === 0) return;
    if (Object.keys(teams[0]).length === 0 || Object.keys(pendingTeams[0]).length === 0) {
      fetchTeamData();
    } else {
      return;
    };
  }, []);

  // display all projects and teams in their own respective rows
    // if a user clicks on a Project or a Team pull up the viewer component for it
    // once in the project or team viewer users can move through any teams or projects they have access to
    // users can navigate back to the dashboard with a home button
    // plus sign is always present in the project nav bar to add teams or projects

  const fetchTeamData = async () => {
    toast.loading('Fetching team data...', {id: 'fetchUserTeamData'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'fetchUserTeamData'});
    } else {
      const apiUrl = 'http://127.0.0.1:8000/team/getUserTeams';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      const response = await request.json();
      console.log(response);
    };
  };

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
        userId={userId}
        formModalPreset={formModalPreset}
        buildUserProfileRef={buildUserProfileRef}
      />
      {getProjectAndTaskRenderElements()}
    </main>
  );
};

export default Dashboard;