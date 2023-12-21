import React, { FC } from 'react';
import { dashboardProps, userInstance } from '../../types/calendarTypes';
import styles from '../../styles/components/Dashboard/dashboard.module.css';
import Calendars from './Calendars';
import ClassOverviews from './ClassOverviews';
import Lessons from './Lessons';
import ProjectsAndTasks from './ProjectsAndTasks';
import TeamLastActive from './TeamLastActive';
import Teams from './Teams';
import UpcomingEvents from './UpcomingEvents';
import UserStats from './UserStats';

const Dashboard: FC<dashboardProps> = (props): JSX.Element => {

  const { user } = props;

  if (Object.keys(user).length !== 0) {
    const user_ref = user as userInstance;
    return (
      <main className={styles.dashboardContainer}>
        <div className={styles.dashboardWelcomeContainer}>
          <h1>Welcome, {user_ref.first_name} {user_ref.last_name}</h1>
          <p><em>Here's the latest:</em></p>
        </div>
        <nav className={styles.dashboardReportingContainer}>
          <Calendars />
          <ClassOverviews />
          <Lessons />
          <ProjectsAndTasks />
          <UpcomingEvents />
          <Teams />
          <TeamLastActive />
          <UserStats />
        </nav>
      </main>
    );
  } else {
    return (
      <main>
        <h1>
          You are not logged in, please log in to see your account in dashboard form
        </h1>
      </main>
    );
  }
};

export default Dashboard;