import React, { useState } from 'react';
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import svgArrow from '../../assets/menu-down.svg';

const ProjectsNav = () => {
  const [currentProject, setCurrentProject] = useState({
    id: '',
    name: '',
  });

  return (
    <div className={styles.projectNavContainer}>
      <p className={styles.projectNavText}>
        {currentProject.name.length > 0 ? currentProject.name : 'No project selected'}
      </p>
      <img 
        className={styles.projectNavSvgArrow}
        alt="arrow"
        src={svgArrow}
      />
    </div>
  );
};

export default ProjectsNav;