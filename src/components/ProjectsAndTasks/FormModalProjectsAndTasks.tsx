import React, { FC, useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { formModalProjectsAndTasksProps } from "../../types/projectAndTaskTypes";

const FormModalProjectsAndTasks: FC<formModalProjectsAndTasksProps> = (props): React.JSX.Element => {

  const { formModalPreset } = props;

  const [currentForm, setCurrentForm] = useState<'team' | 'project'>('team');

  return (
    <div className={styles.projectsAndTasksFormModalSwitchContainer}>
      <p 
        className={
          `${styles.projectsAndTasksFormModalSwitchText} 
          ${currentForm === 'team' ? styles.projectsAndTasksFormModalTextActive 
          : ''}`
        }
      >
        Team
      </p>
      <p 
        className={
          `${styles.projectsAndTasksFormModalSwitchText} 
          ${currentForm === 'project' ? styles.projectsAndTasksFormModalTextActive 
          : ''}`
        }
      >
        Project
      </p>
    </div>
  );
};

export default FormModalProjectsAndTasks;