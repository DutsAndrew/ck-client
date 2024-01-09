import React, { useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import svgArrow from '../../assets/menu-down.svg';

const TeamNav = () => {

  const [currentTeam, setCurrentTeam] = useState({
    id: '',
    name: '',
  });

  return (
    <div className={styles.teamNavContainer}>
      <p className={styles.teamNavText}>
        {currentTeam.name.length > 0 ? currentTeam.name : 'No team selected'}
      </p>
      <img 
        className={styles.teamNavSvgArrow}
        alt="arrow"
        src={svgArrow}
      />
    </div>
  );
};

export default TeamNav;