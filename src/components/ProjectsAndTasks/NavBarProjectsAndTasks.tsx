import React, { FC, useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import TeamNav from "./TeamNav";
import ProjectsNav from "./ProjectsNav";
import addSvg from '../../assets/plus.svg';
import FormModalProjectsAndTasks from "./FormModalProjectsAndTasks";
import { navBarProjectsAndTasksProps } from "../../types/projectAndTaskTypes";

const NavBarProjectsAndTasks: FC<navBarProjectsAndTasksProps> = (props): JSX.Element => {

  const { formModalPreset } = props;

  const [currentView, setCurrentView] = useState('basic');

  const changeView = (newView: 'nav' | 'form') => {
    setCurrentView(newView);
  };

  if (currentView === 'form') {
    return (
      <FormModalProjectsAndTasks 
        formModalPreset={formModalPreset}
      />
    );
  } else {
    return (
      <nav className={styles.projectsAndTasksNavContainer}>
        <div className={styles.projectsAndTasksItemNavContainer}>
          <TeamNav />
          <ProjectsNav />
        </div>
        <img 
          onClick={() => changeView('form')}
          alt='plus sign'
          src={addSvg}
          className={styles.projectsAndTasksAddItemSvg}
        />
      </nav>
    );
  };
};

export default NavBarProjectsAndTasks;