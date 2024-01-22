import React, { FC, useState, useEffect } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { formModalProjectsAndTasksProps } from "../../types/projectAndTaskTypes";
import TeamForm from "./TeamForm";
import ProjectForm from "./ProjectForm";

const FormModalProjectsAndTasks: FC<formModalProjectsAndTasksProps> = (props): React.JSX.Element => {

  const { 
    userId,
    formModalPreset,
    buildUserProfileRef,
  } = props;

  const [currentForm, setCurrentForm] = useState<'team' | 'project'>('team');

  useEffect(() => {
    temporarilyDisableScrollBar();

    return () => {
      reEnableScrollBar();
    };
  }, []);

  const temporarilyDisableScrollBar = () => {
    const body = document.body;
    body.classList.add('disableScrollbar');
  };

  const reEnableScrollBar = () => {
    const body = document.body;
    body.classList.remove('disableScrollbar');
  };

  const handleModalSwitchClick = (requestedForm: 'team' | 'project') => {
    setCurrentForm(requestedForm);
  };

  return (
    <div className={styles.projectsAndTasksFormModalContainer}>

      <div className={styles.projectsAndTasksFormModalSwitchContainer}>
        <p 
          onClick={() => handleModalSwitchClick('team')}
          className={`
            ${styles.projectsAndTasksFormModalSwitchText} 
            ${currentForm === 'team' ? styles.projectsAndTasksFormModalTextActive : ''}
            ${styles.projectsAndTasksFormModalSwitchTextLeft}
          `}
        >
          Team
        </p>
        <p 
          onClick={() => handleModalSwitchClick('project')}
          className={`
            ${styles.projectsAndTasksFormModalSwitchText} 
            ${currentForm === 'project' ? styles.projectsAndTasksFormModalTextActive : ''}
            ${styles.projectsAndTasksFormModalSwitchTextRight}
          `}
        >
          Project
        </p>
      </div>

      {currentForm === 'team' && 
        <TeamForm 
          userId={userId}
          buildUserProfileRef={buildUserProfileRef}
        />
      }
      {currentForm === 'team' && 
        <ProjectForm />
      }

    </div>
  );
};

export default FormModalProjectsAndTasks;