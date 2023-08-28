import React, { FC } from 'react';
import Projects from './Projects';
import Tasks from './Tasks';
import { projectsAndTasksDashboardProps } from '../../types/interfaces';

const Dashboard:FC<projectsAndTasksDashboardProps> = (props): JSX.Element => {

  const { user } = props;

  return (
    <main>
      <Projects />
      <Tasks />
    </main>
  );
};

export default Dashboard;