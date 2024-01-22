import React, { FC, useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import TeamNav from "./TeamNav";
import ProjectsNav from "./ProjectsNav";
import addSvg from '../../assets/plus.svg';
import FormModalProjectsAndTasks from "./FormModalProjectsAndTasks";
import { navBarProjectsAndTasksProps } from "../../types/projectAndTaskTypes";

const NavBarProjectsAndTasks: FC<navBarProjectsAndTasksProps> = (props): JSX.Element => {

  const { 
    userId,
    formModalPreset,
    buildUserProfileRef,
  } = props;

  const [currentView, setCurrentView] = useState('basic');

  const changeView = (newView: 'nav' | 'form') => {
    setCurrentView(newView);
  };

  const handleFormOffClick = (e: React.MouseEvent<HTMLElement>) => {
    const elementId = (e.target as any).id;

    if (elementId === "projects-and-tasks-form-background") {
      setCurrentView('nav');
    } else {
      return;
    };
  };

  return (
    <nav className={styles.projectsAndTasksNavContainer}>
      {currentView === 'form' && 
        <div 
          onClick={(e) => handleFormOffClick(e)}
          id="projects-and-tasks-form-background"
          className={styles.projectsAndTasksNavFormModalBackground}
        >
          <FormModalProjectsAndTasks 
            userId={userId}
            formModalPreset={formModalPreset}
            buildUserProfileRef={buildUserProfileRef}
          />
        </div>
      }
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

export default NavBarProjectsAndTasks;