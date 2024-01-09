import React from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import TeamNav from "./TeamNav";
import ProjectsNav from "./ProjectsNav";
import addSvg from '../../assets/plus.svg';

const NavBarProjectsAndTasks = () => {
  return (
    <nav className={styles.projectsAndTasksNavContainer}>
      <div className={styles.projectsAndTasksItemNavContainer}>
        <TeamNav />
        <ProjectsNav />
      </div>
      <img 
        alt='plus sign'
        src={addSvg}
        className={styles.projectsAndTasksAddItemSvg}
      />
    </nav>
  );
};

export default NavBarProjectsAndTasks;